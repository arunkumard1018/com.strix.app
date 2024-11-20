import { ApiResponse } from "@/types/api-responses";
import { axiosClient } from "./axiosClient"
import { Customers } from "@/types/definetions";
import { CustomersFormData } from "@/components/dashboard/customers/customers-form";


const getCustomersList = async (businessId: string) => {
    try {
        const response = await axiosClient.get<ApiResponse<Customers[]>>(`/api/v1/business/${businessId}/customers`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getCustomers = async (businessId: string, customersId: string) => {
    const response = await axiosClient.get<ApiResponse<Customers>>(`/api/v1/business/${businessId}/customers/${customersId}`);
    return response.data;
}

const createCustomers = async (customersData: CustomersFormData, businessId: string) => {
    const customers = {
        name: customersData.name,
        email: customersData.email,
        phone: customersData.phone,
        GSTIN: customersData.GSTIN,
        PAN: customersData.PAN,
        address: {
            street: customersData.street,
            city: customersData.city,
            state: customersData.state,
            postalCode: customersData.postalCode,
        }
    }
    const response = await axiosClient.post<ApiResponse<Customers>>(`/api/v1/business/${businessId}/customers`, { ...customers });
    return response.data;
}

const updateCustomers = async (customersData: CustomersFormData, customersId: string, businessId: string) => {
    const customers = {
        name: customersData.name,
        email: customersData.email,
        phone: customersData.phone,
        GSTIN: customersData.GSTIN,
        PAN: customersData.PAN,
        address: {
            street: customersData.street,
            city: customersData.city,
            state: customersData.state,
            postalCode: customersData.postalCode,
        }
    }
    const response = await axiosClient.put<ApiResponse<Customers>>(`/api/v1/business/${businessId}/customers/${customersId}`, { ...customers });
    return response.data;
}

const deleteCustomers = async (customersId: string, businessId: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/business/${businessId}/customers/${customersId}`);
        if (response.data.result.deletedCount > 0) return Promise.resolve(true);
        return Promise.resolve(false)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: unknown) {

        return Promise.resolve(false)
    }
}
export { getCustomersList, getCustomers, updateCustomers, createCustomers, deleteCustomers }