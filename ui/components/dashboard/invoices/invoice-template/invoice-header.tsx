import { cn, formatDateDDMMYY } from "@/lib/utils";
import React from 'react';
import { BankDetails, InvoiceDetails, InvoiceFrom, InvoiceTo } from "../types";

interface InvoiceHeadingProps {
    businessName: string;
    buisnessType: string;
    invoiceTitle: string;
}
export const InvoiceHeading = (business: InvoiceHeadingProps) => {
    return (
        <div className="">
            <div className='flex justify-between w-full pb-2'>
                <div className='w-full md:w-1/2 '>
                    <div className='text-2xl font-medium '>{business.businessName}</div>
                    <p className='text-sm text-gray-400 italic'>{business.buisnessType}</p>
                </div>
                <div className='w-full md:w-1/2 flex items-start justify-end'>
                    <div className='md:w-[45%] text-right'>
                        <div className='text-2xl font-bold text-gray-500'>{business.invoiceTitle}</div>
                    </div>

                </div>
            </div>
            <hr className="border-t border-muted-foreground/30" />
        </div>
    )
}

export const InvoiceInfo = ({ invoiceFrom, invoiceTo, invoiceDetails }:
    { invoiceFrom: InvoiceFrom, invoiceTo: InvoiceTo, invoiceDetails: InvoiceDetails }) => {
    return (
        <div className="flex justify-between w-full text-sm">
            {/* Sender Details */}
            <div className="w-full md:w-1/2">
                <div className="font-sans text-xs">
                    <div className="font-serif text-sm">From</div>
                    <p>{invoiceFrom.name}</p>
                    <p>{invoiceFrom.street}</p>
                    <p>{invoiceFrom.city} {invoiceFrom.state} {invoiceFrom.postalCode}</p>
                    {invoiceFrom.phone && <p>Phone: {invoiceFrom.phone}</p>}
                </div>
                {/* Invoice To */}
                <div className="mt-5 font-sans text-xs">
                    <div className="font-serif text-sm">To</div>
                    <p>{invoiceTo.name}</p>
                    <p>{invoiceTo.street}</p>
                    <p>{invoiceTo.city} {invoiceTo.state} {invoiceTo.postalCode}</p>
                    {invoiceTo.phone && <p>Phone: {invoiceTo.phone}</p>}
                    {invoiceTo.PAN && <p>PAN: {invoiceTo.PAN}</p>}
                    {invoiceTo.GSTIN && <p>GSTIN: {invoiceTo.GSTIN}</p>}

                </div>
            </div>
            {/* Invoice Details */}
            <div className="w-full md:w-1/2 flex items-start justify-end font-sans text-xs">
                <div className="md:max-w-[70%]">
                    <p>INVOICE NO: {invoiceDetails.invoicePrefix + invoiceDetails.invoiceNo}</p>
                    <p>Date: {formatDateDDMMYY(invoiceDetails.invoiceDate.toString())}</p>
                    {invoiceDetails.GSTIN && <p>GSTIN: {invoiceDetails.GSTIN}</p>}
                    {invoiceDetails.PAN && <p>PAN: {invoiceDetails.PAN}</p>}
                    {invoiceDetails.HSN && <p>HSN: {invoiceDetails.HSN}</p>}
                    {invoiceDetails.stateCode && <p>State Code: {invoiceDetails.stateCode}</p>}
                </div>
            </div>
        </div>
    );
};


interface InvoiceFooterProps {
    bankDetails: BankDetails;
    isBankDetails: boolean;
    thankYouMessage?: string;
}

export const InvoiceFooter: React.FC<InvoiceFooterProps> = ({
    bankDetails,
    isBankDetails,
    thankYouMessage = 'THANK YOU FOR YOUR BUSINESS!',
}) => {
    return (
        <div className="flex justify-between w-full font-serif">
            {/* Bank Details */}
            {isBankDetails &&
                (<div className="w-full md:w-1/2">
                    <div className="font-sans text-sm">
                        <div className="font-serif text-lg  font-medium">Bank Details</div>
                        {bankDetails.accountName && <p>Account Name: {bankDetails.accountName}</p>}
                        {bankDetails.bankName && <p>Bank Name: {bankDetails.bankName}</p>}
                        {bankDetails.accountNumber && (
                            <p>
                                Account Number: <span className="font-medium">{bankDetails.accountNumber}</span>
                            </p>
                        )}
                        {bankDetails.ifscCode && <p>IFSC Code: {bankDetails.ifscCode}</p>}
                        {bankDetails.branch && <p>Branch: {bankDetails.branch}</p>}
                    </div>
                </div>)}
            {/* Thank You Message */}
            <div className={cn("w-full md:w-1/2 flex flex-col font-sans  mt-10", isBankDetails && "items-end justify-end")}>
                <div>{thankYouMessage}</div>
            </div>
        </div>
    );
};
