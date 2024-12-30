interface InvoiceProductsTransport {
    date: Date;
    vehicleNo: string;
    source: string;
    destination: string;
    price: number;
    cgst: number;
    sgst: number;
    amount: number;
}

interface InvoiceProducts {
    sku: string;
    description: string;
    price: number;
    qty: number;
    cgst: number;
    sgst: number;
    amount: number;
}

interface InvoiceHeading {
    heading: string;
    subHeading?: string;
    title?: string;
}

interface InvoiceFrom {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: number;
    phone?: number;
    email?: string;
}

interface InvoiceTo {
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

interface InvoiceDetails {
    invoicePrefix: string;
    invoiceNo: number;
    invoiceDate: Date;
    dueDate: Date;
    GSTIN?: string;
    PAN?: string;
    HSN?: number;
    stateCode?: number;
}

interface BankDetails {
    bankName?: string;
    accountName?: string;
    accountNumber?: number;
    ifscCode?: string;
    branch?: string;
}

interface AdditionlInfo {
    thankyouNote?: string;
    isBankDetails: boolean;
    isTransportInvoice: boolean;
    paymentStatus: "Paid" | "Processing" | "Due";
    paymentMethod: "Cash" | "UPI" | "BankTransfer" | "CardPayment";
}

interface InvoiceSummary {
    totalPrice: number;
    cgst: number;
    sgst: number;
    invoiceAmount: number;
}

interface Invoice {
    invoiceHeading: InvoiceHeading;
    invoiceFrom: InvoiceFrom;
    invoiceTo: InvoiceTo;
    invoiceDetails: InvoiceDetails;
    invoiceProducts: Array<InvoiceProductsTransport | InvoiceProducts>;
    bankDetails: BankDetails;
    additionalInfo: AdditionlInfo;
    invoiceSummary: InvoiceSummary;
    createdAt?: Date;
    updatedAt?: Date;
    user:Id;
    business:Id;
}