import { ApiResponse } from "@/types/api-responses";
import { InvoiceData, InvoiceStats, LatestInvoices } from "@/types/invoices";
import { axiosClient } from "./axiosClient";

const getLatestInvoices = async (businessId:string) => {
    const response = await axiosClient.get<ApiResponse<LatestInvoices[]>>(`/api/v1/business/${businessId}/stats/latest/invoices`);
    return response.data;
}

const getInvoiceStats = async (businessId:string) => {
    const response = await axiosClient.get<ApiResponse<InvoiceStats>>(`/api/v1/business/${businessId}/stats/invoices`);
    return response.data;
}

const getInvoiceData = async (year:number , businessId:string) => {
    const response = await axiosClient.get<ApiResponse<InvoiceData>>(`/api/v1/business/${businessId}/stats/${year}`);
    return response.data;
}

export { getInvoiceData, getInvoiceStats, getLatestInvoices };

