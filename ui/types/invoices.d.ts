interface Address {
    city: string;
}

interface InvoiceTo {
    name: string;
    city: string;
}
interface InvoiceFrom {
    name: string;
    city: string;
}
interface invoiceDetails {
    invoiceNo: string;
    invoicePrefix: string;
    invoiceDate: Date;
    dueDate: Date;
}
interface additionalInfo {
    paymentStatus: "Paid" | "Processing" | "Due";
    paymentMethod: "Cash" | "UPI" | "BankTransfer" | "CardPayment";
}
interface invoiceSummary {
    totalPrice: number;
    cgst: number;
    sgst: number;
    invoiceAmount: number;
}
interface Invoices {
    _id: string;
    invoiceDetails: invoiceDetails;
    invoiceFrom: InvoiceFrom;
    invoiceTo: InvoiceTo;
    additionalInfo: additionalInfo;
    invoiceSummary: invoiceSummary;
}
export interface LatestInvoices {
    _id: string;
    invoiceNumber: string;
    customerName: string;
    invoiceDate: string;
    paymentMethod: string;
    paymentStatus: string;
    invoiceAmount: number;
}
interface Pagination {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
}
export interface InvoicesData {
    invoices: Invoices[];
    pagination: Pagination;
}


export interface InvoiceStats {
    totalInvoices: number;
    paidInvoices: number;
    processingInvoices: number;
    dueInvoices: number;
    totalPaidAmount: number;
    totalProcessingAmount: number;
    totalDueAmount: number;
}

interface MonthlyData {
    month: string;
    invoices: number;
    PAID: number;
    revenue: number;
    processingAndDue: number;
}
export interface YearlyInvoiceData {
    data: MonthlyData[];
    invoicedAmount: number;
    outstandingAmount: number;
    paidAmount: number;
}

export interface RevenueData {
    invoicedAmount: number;
    paidAmount: number;
    outstandingAmount: number;
    totalInvoices: number;
    totalPaidInvoices: number;
    totalProcessingInvoices: number;
    totalDueInvoices: number;
}