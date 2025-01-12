import { InvoiceHeading } from "./types";


interface InvoiceTo {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phone?: string;
    email?: string;
    GSTIN?: string;
    PAN?: string;
}
interface InvoiceFrom {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phone?: string;
    email?: string;
}
interface InvoiceDetails {
    invoicePrefix: string;
    invoiceNo: string;
    invoiceDate: Date;
    dueDate: Date;
    GSTIN?: string;
    PAN?: string;
    HSN?: string;
    stateCode?: string;
}
interface InvoiceProduct {
    sku: string;
    description: string;
    price: string;
    qty: string;
    cgst: string;
    sgst: string;
    amount: string;
}
interface InvoiceProductTransport {
    date: Date;
    vehicleNo: string;
    source: string;
    destination: string;
    price: string;
    cgst: string;
    sgst: string;
    amount: string;
}
interface BankDetails {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    ifscCode?: string;
    branch?: string;
}
interface AdditionalInfo {
    thankyouNote?: string;
    isBankDetails: boolean;
    isTransportInvoice: boolean;
    paymentStatus: "Paid" | "Processing" | "Due";
    paymentMethod: "Cash" | "UPI" | "BankTransfer" | "CardPayment";
}
// Main interfaces
export interface InvoiceFormData {
    invoiceHeading: InvoiceHeading;
    invoiceFrom: InvoiceFrom;
    invoiceTo: InvoiceTo;
    invoiceDetails: InvoiceDetails;
    invoiceProducts: InvoiceProduct[];
    invoiceProductsTransport: InvoiceProductTransport[];
    bankDetails: BankDetails;
    additionalInfo: AdditionalInfo;
    invoiceSummary: InvoiceSummary;
    customers: string;
}
export interface InvoiceConfig {
    invoiceHeading: InvoiceHeading;
    invoiceFrom: InvoiceFrom;
    invoiceDetails: InvoiceDetails;
    additionalInfo: AdditionalInfo;
    bankDetails: BankDetails;
}