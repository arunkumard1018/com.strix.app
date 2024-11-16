"use client"
import { getCustomers, updateCustomers } from '@/api/customers';
import { CustomersForm, CustomersFormData } from '@/components/dashboard/customers/customers-form';
import { ErrorAlert } from '@/components/reuse/alerts';
import { useToast } from '@/hooks/use-toast';
import { updateCustomer } from '@/store/slices/customersSlice';
import { RootState } from '@/store/store';
import { ApiResponse } from '@/types/api-responses';
import { Customers } from '@/types/definetions';
import { ToastAction } from '@radix-ui/react-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Page() {
    const params = useParams();
    const router = useRouter();
    const storeState = useSelector((state: RootState) => state);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState<Customers>()
    const activeBusinessId = storeState.authContext.activeBusiness._id;
    const customersId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const businessId = customers?.business || activeBusinessId;
    const [isError, setIsError] = useState("")
    const { toast } = useToast()
    useEffect(() => {
        const loadCustomersData = async () => {
            setLoading(true);
            try {
                const response: ApiResponse<Customers> = await getCustomers(activeBusinessId, customersId);
                setCustomers(response.result);
            } catch (error) {
                console.log((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadCustomersData();
    }, [activeBusinessId, customersId])
    const initialValues = {
        name: customers?.name || "",
        email: customers?.email || "",
        GSTIN: customers?.GSTIN || "",
        PAN: customers?.PAN || "",
        phone: String(customers?.phone) || "",
        street: customers?.address.street || "",
        city: customers?.address.city || "",
        state: customers?.address.city || "",
        postalCode: String(customers?.address.postalCode) || "",
    };
    const handleFormData = async (values: CustomersFormData) => {
        try {
            const response: ApiResponse<Customers> = await updateCustomers(values, customersId, businessId);
            if (response.result) dispatch(updateCustomer(response.result));
            toast({
                variant: "success",
                title: "Customer Updated Successfully!",
                description: `Customer ${response.result?.name} updated.`,
                action: <ToastAction altText="Ok" >close</ToastAction>,
            })
            router.push("/dashboard/customers");
        } catch (error) {
            if (axios.isAxiosError(error)) setIsError(error.response?.data.error);
            else setIsError((error as Error).message)
        }
    }
    if (loading) return <div className='text-center mt-10'>Loading...</div>
    return (
        <div className='space-y-4'>
            {isError && <ErrorAlert message={isError} className='mx-2 w-[85vw] md:w-[50vw]' />}
            <CustomersForm handleFormData={handleFormData} initialValues={initialValues} type='Update' className="md:items-start md:ml-4" />
        </div>
    )
}

export default Page