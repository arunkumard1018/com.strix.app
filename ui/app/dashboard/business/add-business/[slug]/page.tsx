"use client"
import { getBusinessInfo, updateBusiness } from "@/api/business";
import { getActivePrefix } from "@/api/invoiceConfig";
import { OnboardingForm, OnBoardingFormData } from "@/components/dashboard/layout/onboarding-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { setConfigData } from "@/store/slices/configSlice";
import { Business, InvoicePrefixes, updateBusinessList } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { BusinessModel } from "@/types/model.definetions";
import { AxiosError } from "axios";
import { AlertCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function Page() {
    const params = useParams()
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Error While Creating New Business");
    const [loading, setLoading] = useState(true)
    const currentInvoiceConfig = useSelector((state: RootState) => state.config.invoiceConfig)
    const dispatch = useDispatch();
    const router = useRouter()
    const businessID = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const [business, setBusiness] = useState<Business>()
    const [activeInvoicePrefix, setActiveInvoicePrefix] = useState<string>("INV")
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getBusinessInfo(businessID);
                setBusiness(response.result)
                setActiveInvoicePrefix(response.result?.invoicePrefixes[0].prefix || "INV-")
                await getActivePrefix(businessID)
                    .then((response: ApiResponse<string>) => setActiveInvoicePrefix(response.result || "INV-"))
                    .catch(() => console.log("Error While Loading Active Prefix"))
            } catch (error) {
                if (!business) {
                    setErrorMessage("Error While Updating Business")
                    if (error instanceof AxiosError) {
                        setErrorMessage(error.response?.data.error)
                    }
                    setIsError(true)
                }
            } finally {
                setLoading(false)
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [businessID])
    const handleOnBoardingFormData = async (values: OnBoardingFormData) => {
        try {
            const businessData: BusinessModel = {
                name: values.name,
                catagory: values.catagory,
                phone: Number(values.phone),
                logo: values.logo,
                city: values.city,
                invoicePrefix: values.invoicePrefix,
            }
            const response: ApiResponse<Business> = await updateBusiness(businessData, businessID);
            if (response.result) {
                dispatch(updateBusinessList(response.result))
                if (currentInvoiceConfig !== undefined) {
                    dispatch(setConfigData({
                        ...currentInvoiceConfig,
                        invoiceDetails: {
                            ...currentInvoiceConfig.invoiceDetails,
                            invoicePrefix: values.invoicePrefix,
                            invoiceNo: String(response.result.invoicePrefixes.find((prefix: InvoicePrefixes) => prefix.prefix === values.invoicePrefix)!.count),
                        }
                    }))
                }
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
            <OnboardingForm initialValues={initialValues} activeInvoicePrefix={activeInvoicePrefix} handleOnBoardingFormData={handleOnBoardingFormData} className="items-start ml-2" />
        </div>
    )
}


export default Page