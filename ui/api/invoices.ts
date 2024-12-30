import { InvoiceFormData } from "@/components/dashboard/invoices/form-data"
import { Invoice } from "@/components/dashboard/invoices/types"
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
        }))  : invoiceData.invoiceProducts.map(product => ({
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
    console.log("data", data);
    const response = await axiosClient.post<ApiResponse<Invoice>>(`/api/v1/business/${businessId}/invoices/`,{...data});
    return response.data;
}

const updateInvoices = async () => {

}
const deleteInvoices = async () => {

}

const getAllInvoices = async (businessId: string) => {
    const response = await axiosClient.get<ApiResponse<InvoicesData>>(`/api/v1/business/${businessId}/invoices/`);
    return response.data;
}

const getInvoiceById = async (invoiceId: string) => {
    const response = await axiosClient.get<ApiResponse<Invoice>>(`/api/v1/invoices/view/${invoiceId}`);
    return response.data;
}

export { createInvoices, deleteInvoices, getAllInvoices, getInvoiceById, updateInvoices }
