import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import PdfTemplate from "../../../../components/pdf/PdfTemplate";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const preview = url.searchParams.get("preview") === "true";
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const mockData = {
        invoiceDetails: { invoiceNo: id, invoiceDate: new Date() },
        invoiceTo: { name: "John Doe", street: "123 Street", city: "City", state: "State" },
        invoiceFrom: { name: "Your Company", street: "456 Avenue", city: "Your City", state: "Your State" },
        invoiceProducts: [{ description: "Product 1", qty: 2, price: 100 }],
        invoicesummary: { totalPrice: 200, cgst: 18, sgst: 18, invoiceAmount: 236 },
    };
    try {
        const qrData = `www.strixinvoice.in/i/${id}`;
        const qrCodeBase64 = await QRCode.toDataURL(qrData);

        // Pass QR Code to PDF Template
        const stream = await renderToStream(<PdfTemplate invoiceData={mockData} qrCode={qrCodeBase64} />);
        const readableStream = new ReadableStream({
            start(controller) {
                stream.on("data", (chunk) => {
                    controller.enqueue(chunk);
                });
                stream.on("end", () => {
                    controller.close();
                });
                stream.on("error", (err) => {
                    controller.error(err);
                });
            },
        });
        const headers: HeadersInit = {
            "Content-Type": "application/pdf",
            "Cache-Control": "no-store, max-age=0",
        };
        if (!preview) {
            // For download
            headers["Content-Disposition"] = `attachment; filename="strix/Invoice-${mockData.invoiceDetails.invoiceNo}.pdf"`;
        } else {
            // For inline preview
            headers["Content-Disposition"] = `inline; filename="Invoice-${mockData.invoiceDetails.invoiceNo}.pdf"`;
        }

        return new NextResponse(readableStream, { headers });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

