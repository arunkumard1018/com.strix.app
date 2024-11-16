"use client"
import { createCustomers } from '@/api/customers';
import { CustomersForm, CustomersFormData } from '@/components/dashboard/customers/customers-form';
import { ErrorAlert } from '@/components/reuse/alerts';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { appendCustomer } from '@/store/slices/customersSlice';
import { RootState } from '@/store/store';
import { ApiResponse } from '@/types/api-responses';
import { Customers } from '@/types/definetions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const initialValues = {
  name: "",
  email: "",
  GSTIN: "",
  PAN: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
};

function Page() {
  const storeState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isError, setIsError] = useState("")

  const businessId = storeState.authContext.activeBusiness._id;
  const { toast } = useToast()

  const handleFormData = async (values: CustomersFormData): Promise<void> => {
    try {
      const response: ApiResponse<Customers> = await createCustomers(values, businessId);
      if (response.result) dispatch(appendCustomer(response.result));
      toast({
        variant: "success",
        title: "Customer Created Successfully!",
        description: `Customer ${response.result?.name} created.`,
        action: <ToastAction altText="Ok" >close</ToastAction>,
      })
      router.push("/dashboard/customers")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) setIsError(error.response?.data.error);
      else setIsError((error as Error).message)
    }
  };
  return (
    <div className='space-y-4'>
      {isError && <ErrorAlert message={isError} className='mx-2 w-[85vw] md:w-[50vw]' />}
      <CustomersForm handleFormData={handleFormData} initialValues={initialValues} type='Create' className="md:items-start md:ml-4" />
    </div>
  )
}

export default Page