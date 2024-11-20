
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


export const InvoiceDetails = () => {
    return (
        <div className="flex justify-between w-full">
            {/* Sender Details */}
            <div className="w-full md:w-1/2">
                <div className="font-sans">
                    <p>#1234 Sunshine Avenue</p>
                    <p>Green Valley Post</p>
                    <p>Bangalore, Karnataka, 560001</p>
                    <p>Phone: +91 9876543210</p>
                </div>
                <div className="mt-7 font-sans">
                    <div className="font-serif text-custome-textBlue">TO:</div>
                    <p>#5678 Moonlight Street</p>
                    <p>Hill View Post</p>
                    <p>Mysore, Karnataka, 570001</p>
                    <p>Phone: +91 9876543211</p>
                    <p>GSTIN: 29ABCDE1234FZ1</p>
                </div>
            </div>

            {/* Invoice Details */}
            <div className="w-full md:w-1/2 flex items-start justify-end font-sans">
                <div className="max-w-[70%]">
                    <p>INVOICE NO: INV/2023/001</p>
                    <p>Date: 01-11-2024</p>
                    <p>GSTIN: 29XYZ9876PL0</p>
                    <p>PAN: ABCDE1234F</p>
                    <p>HSN: 1234</p>
                    <p>State Code: 29</p>
                    <p>State: Karnataka</p>
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
