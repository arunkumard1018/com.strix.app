import { Invoice } from "@/components/dashboard/invoices/types";
import { ApiResponse } from "@/types/api-responses";
import { renderToStream } from "@react-pdf/renderer";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import PdfTemplate from "../../../../components/pdf/PdfTemplate";


export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const invoiceId = url.searchParams.get("id");
    const preview = url.searchParams.get("preview") === "true";

    if (!invoiceId) {
        return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
    }

    try {
        const response = await axios.get<ApiResponse<Invoice>>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/view/${invoiceId}`
        );

        if (!response.data) {
            throw new Error(`Failed to fetch invoice data`);
        }

        const invoiceData = response.data.result;
        if (!invoiceData) {
            throw new Error("Invoice data is missing");
        }

        const host = url.origin;
        const qrData = `${host}/i/${invoiceId}`;
        const qrCodeBase64 = await QRCode.toDataURL(qrData);
        const stream = await renderToStream(<PdfTemplate invoiceData={invoiceData} qrCode={qrCodeBase64} />);
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
        const invoiceNo = `${invoiceData.invoiceDetails.invoicePrefix}${invoiceData.invoiceDetails.invoiceNo}`
        const headers: HeadersInit = {
            "Content-Type": "application/pdf",
            "Cache-Control": "no-store, max-age=0",
            "Content-Disposition": preview
                ? `inline; filename="Invoice-${invoiceNo}.pdf"`
                : `attachment; filename="Invoice-${invoiceNo}.pdf"; noopen`,
        };
        return new NextResponse(readableStream, { headers });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ error: "Internal server error", err: error }, { status: 500 });
    }
}

