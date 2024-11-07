import { axiosClient } from "./axiosClient"
import { BusinessModel } from "@/types/definetions";
import { ApiResponse } from "@/types/api-responses";
import { Business } from "@/store/slices/userSlice";
import { BusinessFormData } from "@/components/dashboard/business/business-form";

const createBusiness = async (businessData: BusinessFormData) => {
        const data: BusinessModel = {
            name: businessData.name,
            catagory: businessData.catagory,
            GSTIN: businessData.GSTIN,
            HSN: Number(businessData.hsn),
            stateCode: Number(businessData.stateCode),
            logo:businessData.logo,
            address: {
                street: businessData.street,
                city: businessData.city,
                state: businessData.state,
                postalCode: Number(businessData.postalCode),
            }
        }
        const response = await axiosClient.post<ApiResponse<Business>>("/api/users/business", { ...data});
        return response.data;
}

export { createBusiness }