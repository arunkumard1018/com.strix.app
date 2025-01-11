import { Check, Copy, Download, Loader2, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Invoice } from "../types";
import { formatCurrency, formatRupee } from "@/lib/utils";

interface CreatedInvoiceViewProps {
    invoice: Invoice;
    onCreateNew: () => void;
}

export function CreatedInvoiceView({ invoice, onCreateNew }: CreatedInvoiceViewProps) {
    const origin = window.location.origin;
    const searchParams = useSearchParams();
    const [isDownloading, setIsDownloading] = useState(false);
    const type = searchParams.get("type");
    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const response = await fetch(`${origin}/api/invoice/download?id=${invoice._id}`);
            if (!response.ok) {
                throw new Error('Download failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${invoice.invoiceDetails.invoicePrefix}${invoice.invoiceDetails.invoiceNo}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('Invoice downloaded successfully', {
                duration: 2000
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to download invoice', {
                duration: 2000
            });
        } finally {
            setIsDownloading(false);
        }
    }

    const handleCopyLink = () => {
        const invoiceLink = `${origin}/i/${invoice._id}`;
        navigator.clipboard.writeText(invoiceLink)
            .then(() => {
                toast.success('Invoice link copied to clipboard', {
                    duration: 2000
                });
            })
            .catch(() => {
                toast.error('Failed to copy link', {
                    duration: 2000
                });
            });
    };

    return (
        <div className="flex justify-center relative">
            <div className="w-full max-w-[800px] border  relative">
                <div className="flex items-center my-5 gap-2">
                    {/* <div><Image src="/gif/completed-flower.gif" alt="" height={50} width={50} /></div> */}
                    <div className="p-2 border-2 border-green-500 rounded-full mx-4"><Check size={20} className="text-green-500" /></div>
                    <h2 className="text-xl font-semibold mb-1 text-green-500">{`Invoice ${type === "UPDATE" ? "Updated" : "Created"} Successfully`}</h2>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={onCreateNew}
                        className="rounded-full border border-muted-foreground  p-3 shadow-2xl
                        hover:bg-muted-foreground/30 hover:scale-110 hover:rotate-12
                        active:scale-95 transition-all duration-200 ease-in-out"
                        title="New Invoice"
                    >
                        <Plus size={20} />
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="rounded-full border border-muted-foreground  p-3 shadow-lg 
                        hover:bg-muted-foreground/30 hover:scale-110 hover:-translate-y-1
                        active:scale-95 transition-all duration-200 ease-in-out"
                        title="Download Invoice"
                    >
                        {isDownloading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Download size={20} />
                        )}
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="rounded-full border border-muted-foreground  p-3 shadow-lg 
                        hover:bg-muted-foreground/30 hover:scale-110 hover:rotate-[-12deg]
                        active:scale-95 transition-all duration-200 ease-in-out"
                        title="Copy Invoice Link"
                    >
                        <Copy size={20} />
                    </button>
                </div>

                <div className="border-t p-4">
                    <div className="space-y-4">
                        {/* Header Section */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-sm border-b pb-1">Invoice To:</h3>
                                <p className="text-sm">{invoice.invoiceTo.name}</p>
                                <p className="text-sm">{invoice.invoiceTo.address}</p>
                                <p className="text-sm">{invoice.invoiceTo.city},{invoice.invoiceTo.state},{invoice.invoiceTo.postalCode}</p>
                                <p className="text-sm">{invoice.invoiceTo.phone}, {invoice.invoiceTo.email}</p>
                                {invoice.invoiceTo.GSTIN && <p className="text-sm">GSTIN : {invoice.invoiceTo.GSTIN}</p>}
                                {invoice.invoiceTo.PAN && <p className="text-sm">PAN : {invoice.invoiceTo.PAN}</p>}
                            </div>
                        </div>

                        {/* Invoice Details Section */}
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Invoice No:</span> {invoice.invoiceDetails.invoicePrefix}{invoice.invoiceDetails.invoiceNo}</p>
                            <p><span className="font-medium">Invoice Date:</span> {new Date(invoice.invoiceDetails.invoiceDate).toLocaleDateString()}</p>
                            <p><span className="font-medium">Due Date:</span> {new Date(invoice.invoiceDetails.dueDate).toLocaleDateString()}</p>
                            <p><span className="font-medium">Payment Status:</span> {invoice.additionalInfo.paymentStatus}</p>
                            <p><span className="font-medium">Payment Method:</span> {invoice.additionalInfo.paymentMethod}</p>
                        </div>

                        {/* Summary Section */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-sm mb-2 border-b pb-1">Invoice Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Total Price:</span>
                                    <span>{formatCurrency(invoice.invoiceSummary.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>CGST:</span>
                                    <span>{formatRupee(invoice.invoiceSummary.cgst)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>SGST:</span>
                                    <span>{formatRupee(invoice.invoiceSummary.sgst)}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2">
                                    <span>Total Amount:</span>
                                    <span>{formatCurrency(invoice.invoiceSummary.invoiceAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 