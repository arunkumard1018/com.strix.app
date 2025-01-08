import { ApiResponse } from "@/types/api-responses";
import { InvoiceStats, LatestInvoices, RevenueData, YearlyInvoiceData } from "@/types/invoices";
import { axiosClient } from "./axiosClient";

const getLatestInvoices = async (businessId:string) => {
    const response = await axiosClient.get<ApiResponse<LatestInvoices[]>>(`/api/v1/business/${businessId}/stats/latest/invoices`);
    return response.data;
}

const getInvoiceStats = async (businessId:string) => {
    const response = await axiosClient.get<ApiResponse<InvoiceStats>>(`/api/v1/business/${businessId}/stats/invoices`);
    return response.data;
}

const getYearlyInvoiceData = async (year:number , businessId:string) => {
    const response = await axiosClient.get<ApiResponse<YearlyInvoiceData>>(`/api/v1/business/${businessId}/stats/${year}`);
    return response.data;
}

const getRevenueData = async (businessId:string) => {
    const response = await axiosClient.get<ApiResponse<RevenueData>>(`/api/v1/business/${businessId}/stats/revenue`);
    return response.data;
}

export { getInvoiceStats, getLatestInvoices, getYearlyInvoiceData, getRevenueData };

