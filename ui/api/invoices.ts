import { ApiResponse } from "@/types/api-responses"
import { axiosClient } from "./axiosClient"
import { Invoices } from "@/types/invoices"

const createInvoices = async () => {

}
const updateInvoices = async () => {

}
const deleteInvoices = async () => {

}

const getAllInvoices = async (businessId: string) => {
    const response = await axiosClient.get<ApiResponse<Invoices[]>>(`/api/v1/business/${businessId}/invoices/`);
    return response.data;
}

const getInvoices = async () => {

}

export { getAllInvoices, createInvoices, updateInvoices, deleteInvoices, getInvoices }