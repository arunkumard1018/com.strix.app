import { axiosClient } from "./axiosClient"
import { BusinessData, BusinessModel } from "@/types/definetions";
import { ApiResponse } from "@/types/api-responses";
import { Business } from "@/store/slices/userSlice";
import { BusinessFormData } from "@/components/dashboard/business/business-form";
import { delay } from "@/lib/utils";
import { invoiceConfig } from "@/config/invoice";
import { InvoiceConfig } from "@/components/dashboard/invoices/types";

const createBusiness = async (businessData: BusinessFormData) => {
    const data: BusinessModel = {
        name: businessData.name,
        catagory: businessData.catagory,
        GSTIN: businessData.GSTIN,
        invoicePrefix: businessData.invoicePrefix,
        phone: Number(businessData.phone),
        HSN: Number(businessData.hsn),
        stateCode: Number(businessData.stateCode),
        logo: businessData.logo,
        address: {
            street: businessData.street,
            city: businessData.city,
            state: businessData.state,
            postalCode: Number(businessData.postalCode),
        }
    }
    const response = await axiosClient.post<ApiResponse<Business>>("/api/v1/users/business", { ...data });
    return response.data;
}

const updateBusiness = async (businessData: BusinessFormData, businessId: string) => {
    const data: BusinessModel = {
        name: businessData.name,
        catagory: businessData.catagory,
        GSTIN: businessData.GSTIN,
        invoicePrefix: businessData.invoicePrefix,
        phone: Number(businessData.phone),
        HSN: Number(businessData.hsn),
        stateCode: Number(businessData.stateCode),
        logo: businessData.logo,
        address: {
            street: businessData.street,
            city: businessData.city,
            state: businessData.state,
            postalCode: Number(businessData.postalCode),
        }
    }
    const response = await axiosClient.put<ApiResponse<BusinessData>>(`/api/v1/users/business/${businessId}`, { ...data });
    return response.data;
}

const getBusinessInfo = async (businessId: string) => {
    const response = await axiosClient.get<ApiResponse<BusinessData>>(`/api/v1/users/business/${businessId}`);
    return response.data;
}

const deleteBusiness = async (businessId: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/users/business/${businessId}`);
        if (response.data.result.deletedCount > 0) return Promise.resolve(true);
        return Promise.resolve(false)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return Promise.resolve(false)
    }
}

const getInvoiceConfig = async (businessId: string) => {
    console.log("Accessing Invoice Config to Be Implemented for Business id", businessId);
    await delay(2000)
    const response: ApiResponse<InvoiceConfig> = {
        status: 'success',
        time: new Date().toISOString(),
        message: "Invoice Config",
        result: invoiceConfig,
    }
    return response;
}
export { createBusiness, getBusinessInfo, updateBusiness, deleteBusiness, getInvoiceConfig }