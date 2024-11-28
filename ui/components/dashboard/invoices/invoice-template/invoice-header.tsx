import { formatDateDDMMYY } from "@/lib/utils";
import { InvoiceDetails, InvoiceFrom, InvoiceTo } from "../invoices-form";

interface InvoiceHeadingProps {
    businessName: string;
    buisnessType: string;
    invoiceTitle: string;
}
export const InvoiceHeading = (business: InvoiceHeadingProps) => {
    return (
        <div>
            <div className='flex justify-between w-full pb-1'>
                <div className='w-full md:w-1/2 '>
                    <div className='text-2xl md:text-4xl font-medium text-custome-textBlue'>{business.businessName}</div>
                    <p className='text-sm text-gray-600 italic'>{business.buisnessType}</p>
                </div>
                <div className='w-full md:w-1/2 flex items-start justify-end'>
                    <div className='md:w-[55%]'>
                        <div className='text-2xl font-extrabold text-custome-textVoilate'>{business.invoiceTitle}</div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}


export const InvoiceInfo = ({ invoiceFrom, invoiceTo, invoiceDetails }:
    { invoiceFrom: InvoiceFrom, invoiceTo: InvoiceTo,invoiceDetails:InvoiceDetails }) => {
    return (
        <div className="flex justify-between w-full">
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
                <div className="max-w-[70%]">
                    <p>INVOICE NO: {invoiceDetails.invoicePrefix+invoiceDetails.invoiceNo}</p>
                    <p>Date: {formatDateDDMMYY(invoiceDetails.invoiceDate.toDateString())}</p>
                    <p>GSTIN: {invoiceDetails.GSTIN}</p>
                    <p>PAN: {invoiceDetails.PAN}</p>
                    <p>HSN: {invoiceDetails.HSN}</p>
                    <p>State Code: {invoiceDetails.stateCode}</p>
                </div>
            </div>
        </div>
    );
};

export const InvoiceFooter = () => {
    return (
        <div className="flex justify-between w-full pt-10">
            {/* Bank Details */}
            <div className="w-full md:w-1/2">
                <div className="font-sans">
                    <div className="font-serif text-xl text-green-400 uppercase font-bold">Bank Details:</div>
                    <p>Name: ABC Logistics Pvt Ltd</p>
                    <p>Bank Name: State Bank of India</p>
                    <p>A/C No: 123456789012</p>
                    <p>IFSC Code: SBIN0001234</p>
                    <p>Branch: Bangalore Main Branch</p>
                </div>
            </div>

            {/* Thank You Message */}
            <div className="w-full md:w-1/2 flex flex-col items-end justify-end font-sans text-custome-textVoilate">
                <div>THANK YOU FOR YOUR BUSINESS!</div>
            </div>
        </div>
    );
};
