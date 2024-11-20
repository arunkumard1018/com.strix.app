interface Address {
    city: string;
}

interface InvoiceTo {
    name: string;
    address: Address;
}

export interface Invoices {
    _id: string;
    invoiceNo: string;
    invoiceDate: string;
    invoiceTo: InvoiceTo;
    paymentStatus: "PROCESSING" | "PAID" | "DUE";
    paymentMethod: "NEFT" | "RTGS" | "CASH" | "UPI" | "DEBIT/CREDIT CARD";
    invoiceAmount: number;
}

export interface InvoiceStats {
    totalInvoices: number;
    totalPaid: number;
    totalProcessing: number;
    totalDue: number;
    totalPaidAmount: number;
    totalProcessingAmount: number;
    totalDueAmount: number;
}