"use client"
import { createBusiness } from '@/api/business';
import { ThemeProvider } from '@/components/themes/theme-provider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { addBusiness, Business, setActiveBusiness } from '@/store/slices/userSlice';
import { ApiResponse } from '@/types/api-responses';
import { AxiosError } from 'axios';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { OnboardingForm, OnBoardingFormData } from './onboarding-form';
const initialValues = {
    name: "",
    catagory: "",   
    phone: "",
    invoicePrefix: "",
    city: "",
    logo: "/img/business-logo.png"
};
function OnboardingPage() {
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Error While Adding Business")
    const dispatch = useDispatch()
    const handleOnBoardingFormData = async (values: OnBoardingFormData) => {
        try {
            const response: ApiResponse<Business> = await createBusiness(values);
            if (response.result) {
                dispatch(addBusiness(response.result))
                dispatch(setActiveBusiness(response.result))
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.error)
            }
            setIsError(true)
        }
    }
    return (
        <div className='bg-custome-black min-h-screen flex items-center justify-center md:pt-10'>
            <div className='  text-center text-white '>
                <div className='space-y-4 mx-2'>
                    {isError && <div>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className='max-w-[320px]'>
                                {errorMessage}
                            </AlertDescription>
                        </Alert>
                    </div>}
                    <div className=" w-[370px] md:w-[390px] shadow-xl border border-gray-800  space-y-4 py-5">
                        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem forcedTheme='dark' disableTransitionOnChange>
                            <OnboardingForm handleOnBoardingFormData={handleOnBoardingFormData} initialValues={initialValues} className='items-center' />
                        </ThemeProvider>
                    </div>

                </div>
            </div>
        </div>
    )
}



export default OnboardingPage