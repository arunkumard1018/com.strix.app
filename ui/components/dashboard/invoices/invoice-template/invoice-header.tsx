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
            <div className='flex justify-between w-full pb-1'>
                <div className='w-full md:w-1/2 '>
                    <div className='text-2xl font-bold text-custome-textBlue'>{business.businessName}</div>
                    <p className='text-sm text-gray-600 italic'>{business.buisnessType}</p>
                </div>
                <div className='w-full md:w-1/2 flex items-start justify-end'>
                    <div className='md:w-[45%] text-right'>
                        <div className='text-2xl font-extrabold text-custome-textVoilate'>{business.invoiceTitle}</div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-400 " />
        </div>
    )
}

export const InvoiceInfo = ({ invoiceFrom, invoiceTo, invoiceDetails }:
    { invoiceFrom: InvoiceFrom, invoiceTo: InvoiceTo, invoiceDetails: InvoiceDetails }) => {
    return (
        <div className="flex justify-between w-full text-sm">
            {/* Sender Details */}
            <div className="w-full md:w-1/2">
                <div className="font-sans">
                    <p>{invoiceFrom.street}</p>
                    <p>{invoiceFrom.street2}</p>
                    <p>{invoiceFrom.city} {invoiceFrom.state} {invoiceFrom.postalCode}</p>
                    <p>Phone: {invoiceFrom.phone}</p>
                </div>
                {/* Invoice To */}
                <div className="mt-7 font-sans">
                    <div className="font-serif text-custome-textBlue">TO:</div>
                    <p>{invoiceTo.street}</p>
                    <p>{invoiceTo.street2}</p>
                    <p>{invoiceTo.city} {invoiceTo.state} {invoiceTo.postalCode}</p>
                    <p>Phone: {invoiceTo.phone}</p>
                    <p>PAN: {invoiceTo.PAN}</p>
                    <p>GSTIN: {invoiceTo.GSTIN}</p>
                </div>
            </div>
            {/* Invoice Details */}
            <div className="w-full md:w-1/2 flex items-start justify-end font-sans">
                <div className="md:max-w-[70%]">
                    <p>INVOICE NO: {invoiceDetails.invoicePrefix + invoiceDetails.invoiceNo}</p>
                    <p>Date: {formatDateDDMMYY(invoiceDetails.invoiceDate)}</p>
                    <p>GSTIN: {invoiceDetails.GSTIN}</p>
                    <p>PAN: {invoiceDetails.PAN}</p>
                    <p>HSN: {invoiceDetails.HSN}</p>
                    <p>State Code: {invoiceDetails.stateCode}</p>
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
                    <div className="font-sans">
                        <div className="font-serif  text-green-400 uppercase font-bold">Bank Details:</div>
                        <p>Name: {bankDetails.accountName}</p>
                        <p>Bank Name: {bankDetails.bankName}</p>
                        <p >ACC No: <span className="font-medium">{bankDetails.accountNumber}</span></p>
                        <p>IFSC Code: {bankDetails.ifscCode}</p>
                        <p>Branch: {bankDetails.branch}</p>
                    </div>
                </div>)}
            {/* Thank You Message */}
            <div className={cn("w-full md:w-1/2 flex flex-col font-sans text-custome-textVoilate mt-10",isBankDetails && "items-end justify-end")}>
                <div>{thankYouMessage}</div>
            </div>
        </div>
    );
};
