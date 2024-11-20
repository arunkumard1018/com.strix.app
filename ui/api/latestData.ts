import { ApiResponse } from "@/types/api-responses";
import { axiosClient } from "./axiosClient"
import { Invoices, InvoiceStats } from "@/types/invoices";

const getLatestInvoices = async () => {
    const response = await axiosClient.get<ApiResponse<Invoices[]>>("/api/v1/users/latest/invoices");
    return response.data;
}

const getInvoiceStats = async (businessId:string) => {
    const response = await axiosClient.get<ApiResponse<InvoiceStats>>(`/api/v1/users/latest/stats/business/${businessId}`);
    return response.data;
}

export { getLatestInvoices, getInvoiceStats }