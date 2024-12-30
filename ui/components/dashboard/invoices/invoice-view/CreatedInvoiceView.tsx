import { Invoices } from "@/types/invoices";
import { Download, Copy, Plus } from "lucide-react";
import { toast } from "sonner";

interface CreatedInvoiceViewProps {
    invoice: Invoices;
    onCreateNew: () => void;
}

export function CreatedInvoiceView({ invoice, onCreateNew }: CreatedInvoiceViewProps) {
    const origin = window.location.origin;

    const handleDownload = async () => {
        try {
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
                <div className="flex flex-col  mb-4 p-4">
                    <h2 className="text-xl font-semibold mb-1 text-green-300">Invoice Created Successfully</h2>
                    <p>{invoice.invoiceTo.name}</p>
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
                        className="rounded-full border border-muted-foreground  p-3 shadow-lg 
                        hover:bg-muted-foreground/30 hover:scale-110 hover:-translate-y-1
                        active:scale-95 transition-all duration-200 ease-in-out"
                        title="Download Invoice"
                    >
                        <Download size={20} />
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
                            <div>
                                <h3 className="font-semibold text-sm border-b pb-1">Invoice From:</h3>
                                <p className="text-sm">{invoice.invoiceFrom.name}</p>
                                <p className="text-sm">{invoice.invoiceFrom.city}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm border-b pb-1">Invoice To:</h3>
                                <p className="text-sm">{invoice.invoiceTo.name}</p>
                                <p className="text-sm">{invoice.invoiceTo.city}</p>
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
                                    <span>₹{invoice.invoiceSummary.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>CGST:</span>
                                    <span>₹{invoice.invoiceSummary.cgst.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>SGST:</span>
                                    <span>₹{invoice.invoiceSummary.sgst.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2">
                                    <span>Total Amount:</span>
                                    <span>₹{invoice.invoiceSummary.invoiceAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 