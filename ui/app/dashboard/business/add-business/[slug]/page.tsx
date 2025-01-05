"use client"
import { getBusinessInfo, updateBusiness } from "@/api/business";
import { OnboardingForm, OnBoardingFormData } from "@/components/dashboard/layout/onboarding-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Business, updateBusinessList } from "@/store/slices/userSlice";
import { ApiResponse } from "@/types/api-responses";
import { BusinessModel } from "@/types/model.definetions";
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
    const [business, setBusiness] = useState<Business>()
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
            } finally {
                setLoading(false)
            }
        }
        loadData();
    }, [businessID])
    const handleOnBoardingFormData = async (values: OnBoardingFormData) => {
        try {
            const businessData: BusinessModel = {
                name: values.name,
                catagory: values.catagory,
                phone: Number(values.phone),
                logo: values.logo,
                city: values.city,
                invoicePrefixes: business?.invoicePrefixes || [],
            }
            const response: ApiResponse<Business> = await updateBusiness(businessData, businessID);
            if (response.result) {
                dispatch(updateBusinessList(response.result))
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
        phone: String(business?.phone) || "",
        invoicePrefix: "INV-",
        city: business?.city || "",
        logo: business?.logo || "/img/business-logo.png"
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
            <OnboardingForm initialValues={initialValues} handleOnBoardingFormData={handleOnBoardingFormData} className="items-start ml-2"  type="Update"/>
        </div>
    )
}


export default Page