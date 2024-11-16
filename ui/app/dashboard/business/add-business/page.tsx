"use client"
import { createBusiness } from "@/api/business";
import { BusinessForm, BusinessFormData } from "@/components/dashboard/business/business-form";
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
  GSTIN: "",
  hsn: "",
  stateCode: "",
  phone:"",
  invoicePrefix:"",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  logo: "/img/strix-black.png"
};

function Page() {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Error While Creating New Business")
  const dispatch = useDispatch();
  const router = useRouter()
  const handleBusinessFormData = async (values: BusinessFormData) => {
    try {
      const response: ApiResponse<Business> = await createBusiness(values);
      if (response.result) {
        const business: Business = {
            _id: response.result._id,
            name: response.result.name,
            GSTIN:response.result.GSTIN || "",
            HSN:response.result.HSN || 0,
            invoicePrefix:response.result.invoicePrefix,
            catagory: response.result.catagory,
            logo: response.result.logo,
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
      <BusinessForm initialValues={initialValues} handleBusinessFormData={handleBusinessFormData} className="items-start ml-2"/>
    </div>
  )
}

export default Page