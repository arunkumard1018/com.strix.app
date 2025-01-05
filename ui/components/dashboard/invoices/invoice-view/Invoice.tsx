import { cn, formatDateDDMMYY } from "@/lib/utils";
import { Invoice as InvoiceType } from "../types";
import { InvoiceProductsTable } from "./InvoiceProductsTable";
import { Copy, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
// Status badge styles based on payment status
export const statusStyles = {
    Paid: "border  text-green-500",
    Processing: "border  text-yellow-500",
    Due: "border  text-red-500"
};

export function Invoice({ invoiceData }: { invoiceData: InvoiceType }) {
    console.log(invoiceData)
    const [isDownloading, setIsDownloading] = useState(false);
    const [isQRCodeLoading, setIsQRCodeLoading] = useState(true);

    const [qrCodeData, setQrCodeData] = useState<string | null>(null);

    // Generate QR Code on mount
    useEffect(() => {
        const generateQRCodeData = async () => {
            setIsQRCodeLoading(true);
            try {
                const qrData = window.location.href;
                const qrCodeBase64 = await QRCode.toDataURL(qrData);
                setQrCodeData(qrCodeBase64);
            } catch {
                setQrCodeData(null);
            } finally {
                setIsQRCodeLoading(false);
            }
        };

        generateQRCodeData();
    }, []);

    const handleDownload = async () => {
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            const response = await fetch(`/api/invoice/download?id=${invoiceData._id}`);
            if (!response.ok) {
                throw new Error('Download failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${invoiceData.invoiceDetails.invoicePrefix}${invoiceData.invoiceDetails.invoiceNo}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('Invoice downloaded successfully', {
                duration: 2000
            });
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download invoice', {
                duration: 2000
            });
        } finally {
            setIsDownloading(false);
        }
    }
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard', {
            duration: 2000
        });
    }
    return (
        <div className="relative w-full max-w-4xl mx-auto border p-4 sm:p-8">
            {/* Payment Status Badge */}
            <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[invoiceData.additionalInfo.paymentStatus]}`}>
                    {invoiceData.additionalInfo.paymentStatus}
                </span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-1 sm:gap-4 ">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{invoiceData.invoiceHeading.heading}</h1>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">{invoiceData.invoiceHeading.subHeading}</p>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-300">{invoiceData.invoiceHeading.title}</h2>
            </div>

            <hr className="my-4" />

            {/* Invoice Details - Shown at top on mobile */}
            <div className="block sm:hidden mb-6">
                <div className="text-xs space-y-1">
                    <p>Invoice No: {invoiceData.invoiceDetails.invoicePrefix}{invoiceData.invoiceDetails.invoiceNo}</p>
                    <p>Date: {formatDateDDMMYY(invoiceData.invoiceDetails.invoiceDate.toString())}</p>
                    {invoiceData.invoiceDetails.dueDate && <p>Due Date: {formatDateDDMMYY(invoiceData.invoiceDetails.dueDate.toString())}</p>}
                    {invoiceData.invoiceDetails.GSTIN && <p>GSTIN: {invoiceData.invoiceDetails.GSTIN}</p>}
                    {invoiceData.invoiceDetails.PAN && <p>PAN: {invoiceData.invoiceDetails.PAN}</p>}
                    {invoiceData.invoiceDetails.HSN !== 0 && <p>HSN: {invoiceData.invoiceDetails.HSN}</p>}
                    {invoiceData.invoiceDetails.stateCode !== 0 && <p>State Code: {invoiceData.invoiceDetails.stateCode}</p>}
                </div>
            </div>

            {/* Addresses */}
            <div className="flex flex-col sm:flex-row justify-between mb-8 gap-6">
                <div className="space-y-4 w-full sm:w-auto">
                    <div className="">
                        <p className="text-xs sm:text-sm font-medium">From:</p>
                        <p className="text-xs sm:text-sm">{invoiceData.invoiceFrom.name}</p>
                        <p className="text-xs sm:text-sm">{invoiceData.invoiceFrom.address}</p>
                        <p className="text-xs sm:text-sm">
                            {invoiceData.invoiceFrom.city}, {invoiceData.invoiceFrom.state}, {invoiceData.invoiceFrom.postalCode}
                        </p>
                        {invoiceData.invoiceFrom.phone && (
                            <p className="text-xs sm:text-sm">Phone: {invoiceData.invoiceFrom.phone}</p>
                        )}
                        {invoiceData.invoiceFrom.email && (
                            <p className="text-xs sm:text-sm">Email: {invoiceData.invoiceFrom.email}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="text-xs sm:text-sm font-medium">To:</p>
                        <p className="text-xs sm:text-sm">{invoiceData.invoiceTo.name}</p>
                        <p className="text-xs sm:text-sm">{invoiceData.invoiceTo.address}</p>
                        <p className="text-xs sm:text-sm">
                            {invoiceData.invoiceTo.city}, {invoiceData.invoiceTo.state}, {invoiceData.invoiceTo.postalCode}
                        </p>
                        {invoiceData.invoiceTo.phone && (
                            <p className="text-xs sm:text-sm">Phone: {invoiceData.invoiceTo.phone}</p>
                        )}
                        {invoiceData.invoiceTo.email && (
                            <p className="text-xs sm:text-sm">Email: {invoiceData.invoiceTo.email}</p>
                        )}
                    </div>
                </div>

                {/* Invoice Details - Hidden on mobile, shown on desktop */}
                <div className="hidden sm:block text-sm space-y-1 w-full sm:w-auto">
                    <p>Invoice No: {invoiceData.invoiceDetails.invoicePrefix}{invoiceData.invoiceDetails.invoiceNo}</p>
                    <p>Date: {formatDateDDMMYY(invoiceData.invoiceDetails.invoiceDate.toString())}</p>
                    {invoiceData.invoiceDetails.dueDate && <p>Due Date: {formatDateDDMMYY(invoiceData.invoiceDetails.dueDate.toString())}</p>}
                    {invoiceData.invoiceDetails.GSTIN && <p>GSTIN: {invoiceData.invoiceDetails.GSTIN}</p>}
                    {invoiceData.invoiceDetails.PAN && <p>PAN: {invoiceData.invoiceDetails.PAN}</p>}
                    {invoiceData.invoiceDetails.HSN !== 0 && <p>HSN: {invoiceData.invoiceDetails.HSN}</p>}
                    {invoiceData.invoiceDetails.stateCode !== 0 && <p>State Code: {invoiceData.invoiceDetails.stateCode}</p>}
                </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto -mx-4 sm:mx-0">
                <InvoiceProductsTable
                    products={invoiceData.invoiceProducts}
                    invoiceSummary={invoiceData.invoiceSummary}
                />
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-6">
                {invoiceData.additionalInfo.isBankDetails && invoiceData.bankDetails && (
                    <div className="text-sm space-y-1">
                        <p className="font-bold mb-2">Bank Details:</p>
                        {invoiceData.bankDetails.bankName && <p>Bank Name: {invoiceData.bankDetails.bankName}</p>}
                        {invoiceData.bankDetails.accountName && <p>Account Name: {invoiceData.bankDetails.accountName}</p>}
                        {invoiceData.bankDetails.accountNumber && <p>Account No: {invoiceData.bankDetails.accountNumber}</p>}
                        {invoiceData.bankDetails.ifscCode && <p>IFSC Code: {invoiceData.bankDetails.ifscCode}</p>}
                        {invoiceData.bankDetails.branch && <p>Branch: {invoiceData.bankDetails.branch}</p>}
                    </div>
                )}
                <div className={cn("text-right flex flex-col items-start justify-end", invoiceData.additionalInfo.isBankDetails && "items-end")}>
                    {isQRCodeLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        qrCodeData ? <Image src={qrCodeData} alt="QR" className="w-20 h-20" width={96} height={96} /> : null
                    )}
                    {invoiceData.additionalInfo.thankyouNote && (
                        <p className="text-sm mt-2">Thank you for your Business!</p>
                    )}
                </div>
            </div>
            {/* Floating Action Buttons */}
            <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 mb-2">
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                    title="Download"
                >
                    {isDownloading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Download className="w-5 h-5" />
                    )}
                </button>
                <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="Copy Link"
                >
                    <Copy className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default Invoice; 