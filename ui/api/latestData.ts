import { ApiResponse } from "@/types/api-responses";
import { InvoiceData, Invoices, InvoiceStats } from "@/types/invoices";
import { axiosClient } from "./axiosClient";

const getLatestInvoices = async () => {
    const response = await axiosClient.get<ApiResponse<Invoices[]>>("/api/v1/users/latest/invoices");
    return response.data;
}

const getInvoiceStats = async (businessId:string) => {
    const response = await axiosClient.get<ApiResponse<InvoiceStats>>(`/api/v1/users/latest/stats/business/${businessId}`);
    return response.data;
}

const getInvoiceData = async (year:number , businessId:string) => {
    const response = await axiosClient.get<ApiResponse<InvoiceData>>(`/api/v1/users/latest/stats/${year}/business/${businessId}`);
    return response.data;
}

export { getInvoiceData, getInvoiceStats, getLatestInvoices };

