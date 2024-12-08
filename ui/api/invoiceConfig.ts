import { ApiResponse } from "@/types/api-responses";
import { axiosClient } from "./axiosClient"
import { InvoiceConfig } from "@/components/dashboard/invoices/types";

const createUrl = (businessId: string) => {
    return `/api/v1/business/${businessId}/invoice-config`
}
const getInvoiceConfig = async (businessId: string) => {
    const response = await axiosClient.get<ApiResponse<InvoiceConfig>>(createUrl(businessId));
    return response.data;
}
const createInvoiceConfig = async (businessId: string, config: InvoiceConfig) => {
    const response = await axiosClient.post<ApiResponse<InvoiceConfig>>(createUrl(businessId), { ...config });
    return response.data;
}
const updateInvoiceConfig = async (businessId: string, config: InvoiceConfig) => {
    const response = await axiosClient.put<ApiResponse<InvoiceConfig>>(createUrl(businessId), { ...config });
    return response.data;
}

export {
    getInvoiceConfig,
    createInvoiceConfig,
    updateInvoiceConfig,
}