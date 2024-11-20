"use client"
import { getBusinessInfo, updateBusiness } from "@/api/business";
import { BusinessForm, BusinessFormData } from "@/components/dashboard/business/business-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Business, updateBusinessList } from "@/store/slices/userSlice";
import { ApiResponse } from "@/types/api-responses";
import { BusinessData } from "@/types/definetions";
import { AxiosError } from "axios";
import { AlertCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


function Page() {
    const params = useParams()
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Error While Creating New Business");
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const router = useRouter()
    const businessID = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const [business, setBusiness] = useState<BusinessData>()
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getBusinessInfo(businessID);
                setBusiness(response.result)
            } catch (error) {
                setErrorMessage("Error While Updating Business")
                if (error instanceof AxiosError) {
                    setErrorMessage(error.response?.data.error)
                }
                setIsError(true)
            }finally{
                setLoading(false)
            }
        }
        loadData();
    }, [businessID])
    const handleBusinessFormData = async (values: BusinessFormData) => {
        try {
            const response: ApiResponse<BusinessData> = await updateBusiness(values, businessID);
            if (response.result) {
                const business: Business = {
                    _id: response.result._id,
                    name: response.result.name,
                    catagory: response.result.catagory,
                    GSTIN:response.result.GSTIN || "",
                    HSN:response.result.HSN || 0,
                    invoicePrefix:response.result.invoicePrefix,
                    logo: response.result.logo,
                }
                dispatch(updateBusinessList(business))
                router.push("/dashboard/business")
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.error)
            }
            setIsError(true)
        }
    }

    const initialValues = {
        name: business?.name || "",
        catagory: business?.catagory || "",
        GSTIN: business?.GSTIN || "",
        hsn: String(business?.HSN) || "",
        phone:String(business?.phone) || "",
        invoicePrefix: business?.invoicePrefix || "",
        stateCode: String(business?.stateCode) || "",
        street: business?.address.street || "",
        city: business?.address.city || "",
        state: business?.address.state || "",
        postalCode: String(business?.address.postalCode) || "",
        logo: business?.logo || "/img/strix-black.png"
    };
    if (loading) return <div className="text-center text-xl mt-16">Loading...</div>
    return (
        <div className='px-10 text-center bg-background'>
            {isError &&
                <div className="w-[320px]">
                    <Alert variant="destructive" className="flex items-center space-x-2">
                        <div><AlertCircle className="h-4 w-4" /></div>
                        <AlertDescription className='max-w-[320px]'>
                            {errorMessage}
                        </AlertDescription>
                    </Alert>
                </div>}
            <BusinessForm initialValues={initialValues} handleBusinessFormData={handleBusinessFormData} className="items-start ml-2" type="Update" />
        </div>
    )
}


export default Page