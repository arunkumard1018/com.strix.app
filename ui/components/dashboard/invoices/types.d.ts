// Common interfaces
export interface InvoiceHeading {
    heading: string;
    subHeading?: string;
    title?: string;
}

export interface InvoiceFrom {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: number;
    phone?: number;
    email?: string;
}

export interface InvoiceTo {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: number;
    phone?: number;
    email?: string;
    GSTIN?: string;
    PAN?: string;
}

export interface InvoiceDetails {
    invoicePrefix: string;
    invoiceNo: number;
    invoiceDate: Date;
    dueDate: Date;
    GSTIN?: string;
    PAN?: string;
    HSN?: number;
    stateCode?: number;
}

export interface InvoiceProduct {
    sku: string;
    description: string;
    price: number;
    qty: number;
    cgst: number;
    sgst: number;
    amount: number;
}

export interface InvoiceProductTransport {
    date: Date;
    vehicleNo: string;
    source: string;
    destination: string;
    price: number;
    cgst: number;
    sgst: number;
    amount: number;
}

export interface BankDetails {
    bankName?: string;
    accountName?: string;
    accountNumber?: number;
    ifscCode?: string;
    branch?: string;
}

export interface AdditionlInfo {
    thankyouNote?: string;
    isBankDetails: boolean;
    isTransportInvoice: boolean;
    paymentStatus: "Paid" | "Processing" | "Due";
    paymentMethod: "Cash" | "UPI" | "BankTransfer" | "CardPayment";
}

export interface InvoiceSummary {
    totalPrice: number;
    cgst: number;
    sgst: number;
    invoiceAmount: number;
}

// Config interfaces
export interface InvoiceDetailsConfig {
    invoicePrefix: string;
    invoiceNo: string;
    GSTIN: string;
    PAN: string;
    HSN: string;
    stateCode: string;
}

export interface Invoice {
    _id?: string;
    invoiceHeading: InvoiceHeading;
    invoiceFrom: InvoiceFrom;
    invoiceTo: InvoiceTo;
    invoiceDetails: InvoiceDetails;
    invoiceProducts: Array<InvoiceProductTransport | InvoiceProduct>;
    bankDetails: BankDetails;
    additionalInfo: AdditionlInfo;
    invoiceSummary: InvoiceSummary;
    createdAt?: Date;
    updatedAt?: Date;
    user?: string;
    business?: string;
    customers?: string;
}