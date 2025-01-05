"use client"
import { createBusiness } from "@/api/business";
import { OnboardingForm, OnBoardingFormData } from "@/components/dashboard/layout/onboarding-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addBusiness, Business } from "@/store/slices/userSlice";
import { ApiResponse } from "@/types/api-responses";
import { AxiosError } from "axios";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";


const initialValues = {
  name: "",
  catagory: "",
  phone:"",
  invoicePrefix:"INV-",
  city: "",
  logo: "/img/business-logo.png"
};

function Page() {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Error While Creating New Business")
  const dispatch = useDispatch();
  const router = useRouter()
  const handleOnBoardingFormData = async (values: OnBoardingFormData) => {
    try {
      const response: ApiResponse<Business> = await createBusiness(values);
      if (response.result) {
        const business: Business = {
            _id: response.result._id,
            name: response.result.name,
            invoicePrefixes: response.result.invoicePrefixes,
            catagory: response.result.catagory,
            logo: response.result.logo,
            phone: response.result.phone,
            city: response.result.city,
        }
        dispatch(addBusiness(business));
        router.push("/dashboard/business");
    }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.error)
      }
      setIsError(true)
    }
  }
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
      <OnboardingForm initialValues={initialValues} handleOnBoardingFormData={handleOnBoardingFormData} className="items-start ml-2"/>
    </div>
  )
}

export default Page