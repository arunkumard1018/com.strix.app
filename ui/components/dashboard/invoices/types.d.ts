export interface Inoviceheading {
    heading: string;
    subHeading: string;
    title: string;
}
export interface InvoiceFrom {
    street: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
}
export interface InvoiceTo {
    street: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    GSTIN: string;
    PAN: string;
}
export interface InvoiceDetails {
    invoicePrefix: string
    invoiceNo: string;
    invoiceDate: string;
    GSTIN: string;
    PAN: string;
    HSN: string;
    stateCode: string;
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
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
}
export interface AdditionlInfo {
    thankyouNote: string;
    isBankDetails: boolean;
}
export interface Invoicesummary {
    totalPrice: number;
    cgst: number;
    sgst: number;
    invoiceAmount: number;
}

export interface InvoiceFormData {
    inoviceheading: Inoviceheading;
    invoiceFrom: InvoiceFrom;
    invoiceTo: InvoiceTo;
    invoiceDetails: InvoiceDetails;
    invoiceProducts: InvoiceProduct[];
    invoiceProductsTransport: InvoiceProductTransport[];
    bankDetails: BankDetails;
    additionlInfo: AdditionlInfo;
    invoicesummary: Invoicesummary;
}

export interface InvoiceConfig {
    inoviceheading: Inoviceheading;
    invoiceFrom: InvoiceFrom;
    invoiceDetails: InvoiceDetails;
    additionlInfo: AdditionlInfo;
    bankDetails: BankDetails;
}