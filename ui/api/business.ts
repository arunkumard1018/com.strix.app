import { OnBoardingFormData } from "@/components/dashboard/layout/onboarding-form";
import { Business } from "@/store/slices/userSlice";
import { ApiResponse } from "@/types/api-responses";
import { BusinessModel } from "@/types/model.definetions";
import { axiosClient } from "./axiosClient";

const createBusiness = async (onboardingData: OnBoardingFormData) => {
    const data: BusinessModel = {
        name: onboardingData.name,
        catagory: onboardingData.catagory,
        invoicePrefixes: [{ prefix: onboardingData.invoicePrefix, count: 1 }],
        phone: Number(onboardingData.phone),
        logo: onboardingData.logo,
        city: onboardingData.city,
    }
    const response = await axiosClient.post<ApiResponse<Business>>("/api/v1/users/business", { ...data });
    return response.data;
}

const updateBusiness = async (businessData: BusinessModel, businessId: string) => {
    const response = await axiosClient.put<ApiResponse<Business>>(`/api/v1/users/business/${businessId}`, { ...businessData });
    return response.data;
}

const getBusinessInfo = async (businessId: string) => {
    const response = await axiosClient.get<ApiResponse<Business>>(`/api/v1/users/business/${businessId}`);
    return response.data;
}

const deleteBusiness = async (businessId: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/users/business/${businessId}`);
        if (response.data.result.deletedCount > 0) return Promise.resolve(true);
        return Promise.resolve(false)
    } catch {
        return Promise.resolve(false)
    }
}

export { createBusiness, deleteBusiness, getBusinessInfo, updateBusiness };

