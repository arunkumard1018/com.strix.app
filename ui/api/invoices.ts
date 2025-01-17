import { InvoiceFormData } from "@/components/dashboard/invoices/form-data"
import { Invoice, PaymentStatus } from "@/components/dashboard/invoices/types"
import { ApiResponse } from "@/types/api-responses"
import { InvoicesData } from "@/types/invoices"
import { axiosClient } from "./axiosClient"
import { calculateSummary } from "./utill"

const createInvoices = async (businessId: string, invoiceData: InvoiceFormData) => {

    const data: Invoice = {
        invoiceHeading: invoiceData.invoiceHeading,
        invoiceFrom: {
            ...invoiceData.invoiceFrom,
            postalCode: Number(invoiceData.invoiceFrom.postalCode),
            phone: Number(invoiceData.invoiceFrom.phone),
        },
        invoiceTo: {
            ...invoiceData.invoiceTo,
            postalCode: Number(invoiceData.invoiceTo.postalCode),
            phone: Number(invoiceData.invoiceTo.phone),
        },
        invoiceDetails: {
            ...invoiceData.invoiceDetails,
            invoiceNo: Number(invoiceData.invoiceDetails.invoiceNo),
            HSN: Number(invoiceData.invoiceDetails.HSN),
            stateCode: Number(invoiceData.invoiceDetails.stateCode),
        },
        invoiceProducts: invoiceData.additionalInfo.isTransportInvoice ? invoiceData.invoiceProductsTransport.map(product => ({
            ...product,
            price: Number(product.price),
            cgst: Number(product.cgst),
            sgst: Number(product.sgst),
            amount: Number(product.amount),
        })) : invoiceData.invoiceProducts.map(product => ({
            ...product,
            price: Number(product.price),
            cgst: Number(product.cgst),
            sgst: Number(product.sgst),
            amount: Number(product.amount),
            qty: Number(product.qty),
        })),
        bankDetails: {
            ...invoiceData.bankDetails,
            accountNumber: Number(invoiceData.bankDetails.accountNumber),
        },
        additionalInfo: invoiceData.additionalInfo,
        invoiceSummary: invoiceData.invoiceSummary,
        customers: invoiceData.customers,
    }
    data.invoiceSummary = calculateSummary(data);
    const response = await axiosClient.post<ApiResponse<Invoice>>(`/api/v1/business/${businessId}/invoices/`, { ...data });
    return response.data;
}

const updateInvoices = async (businessId: string, invoiceData: InvoiceFormData, invoiceId: string) => {

    const data: Invoice = {
        invoiceHeading: invoiceData.invoiceHeading,
        invoiceFrom: {
            ...invoiceData.invoiceFrom,
            postalCode: Number(invoiceData.invoiceFrom.postalCode),
            phone: Number(invoiceData.invoiceFrom.phone),
        },
        invoiceTo: {
            ...invoiceData.invoiceTo,
            postalCode: Number(invoiceData.invoiceTo.postalCode),
            phone: Number(invoiceData.invoiceTo.phone),
        },
        invoiceDetails: {
            ...invoiceData.invoiceDetails,
            invoiceNo: Number(invoiceData.invoiceDetails.invoiceNo),
            HSN: Number(invoiceData.invoiceDetails.HSN),
            stateCode: Number(invoiceData.invoiceDetails.stateCode),
        },
        invoiceProducts: invoiceData.additionalInfo.isTransportInvoice ? invoiceData.invoiceProductsTransport.map(product => ({
            ...product,
            price: Number(product.price),
            cgst: Number(product.cgst),
            sgst: Number(product.sgst),
            amount: Number(product.amount),
        })) : invoiceData.invoiceProducts.map(product => ({
            ...product,
            price: Number(product.price),
            cgst: Number(product.cgst),
            sgst: Number(product.sgst),
            amount: Number(product.amount),
            qty: Number(product.qty),
        })),
        bankDetails: {
            ...invoiceData.bankDetails,
            accountNumber: Number(invoiceData.bankDetails.accountNumber),
        },
        additionalInfo: invoiceData.additionalInfo,
        invoiceSummary: invoiceData.invoiceSummary,
        customers: invoiceData.customers,
    }
    data.invoiceSummary = calculateSummary(data);
    const response = await axiosClient.put<ApiResponse<Invoice>>(`/api/v1/business/${businessId}/invoices/${invoiceId}`, { ...data });
    return response.data;
}
const deleteInvoiceById = async (businessId: string, invoiceId: string) => {
    try {
        const response = await axiosClient.delete<ApiResponse<Invoice>>(`/api/v1/business/${businessId}/invoices/${invoiceId}`);
        if (response.data) {
            return Promise.resolve(true);
        } else {
            return Promise.reject(false);
        }
    } catch {
        return Promise.reject(false);
    }
}

const getAllInvoices = async (businessId: string,page:number,limit:number,q:string) => {
    const response = await axiosClient.get<ApiResponse<InvoicesData>>(`/api/v1/business/${businessId}/invoices?page=${page}&limit=${limit}&q=${q}`);
    return response.data;
}

const getInvoiceById = async (invoiceId: string) => {
    const response = await axiosClient.get<ApiResponse<Invoice>>(`/api/v1/invoices/view/${invoiceId}`);
    return response.data;
}

const updatePaymentStatus = async (businessId: string, invoiceId: string, paymentStatus: PaymentStatus) => {
    const response = await axiosClient.patch<ApiResponse<PaymentStatus>>(`/api/v1/business/${businessId}/invoices/${invoiceId}/payment-status`, { paymentStatus });
    return response.data;
}

export { createInvoices, deleteInvoiceById, getAllInvoices, getInvoiceById, updateInvoices, updatePaymentStatus }
