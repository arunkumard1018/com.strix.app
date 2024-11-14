type TransportInvoiceDetails = {
    vehicleNo: string;
    source?: string;
    destination?: string;
    amount: number;
};

type ProductInvoiceDetails = {
    sku: string;
    productName: string;
    price: number;
};

type Address = {
    street: string;
    city: string;
    postalCode: number;
    state: string;
};

type Person = {
    name: string;
    GSTIN?: string;
    HSN?: number;
    stateCode?: number;
    PAN?: string;
    phone: number;
    email?: string;
    address: Address;
};

type Invoice = {
    invoiceNo: string;
    invoiceDate: Date;
    invoiceBy: Person;
    invoiceTo: Person;
    invoiceDetails: Array<TransportInvoiceDetails | ProductInvoiceDetails>;
    invoiceAmount: number;
    CGST?: number;
    SGST?: number;
    business: Id;
    customers: Id;
    user: Id;
};

export {Address,Invoice,Person,ProductInvoiceDetails,TransportInvoiceDetails}