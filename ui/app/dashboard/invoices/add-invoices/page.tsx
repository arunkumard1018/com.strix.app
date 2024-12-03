"use client"
import { getInvoiceConfig } from '@/api/business';
import { InvoiceForm } from '@/components/dashboard/invoices/invoices-form';
import { InvoiceConfig, InvoiceFormData } from '@/components/dashboard/invoices/types';
import { invoiceFormInitialData } from '@/config/invoice';
import { setInvoiceConfig } from '@/store/slices/invoiceConfigSlice';
import { RootState } from '@/store/store';
import { ApiResponse } from '@/types/api-responses';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Page() {
  const globalState = useSelector((state: RootState) => state);
  const activeBusiness = globalState.authContext.activeBusiness;
  let initalValues: InvoiceFormData = invoiceFormInitialData;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadInvoiceConfig = async () => {
      try {
        const response: ApiResponse<InvoiceConfig> = await getInvoiceConfig(activeBusiness._id);
        console.log("Out Diaptch",response.result)
        if (response.result !== undefined) {
          console.log("Inside Diaptch",response.result)
          dispatch(setInvoiceConfig(response.result))
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
      } finally {
        setLoading(false)
      }
    }
    loadInvoiceConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBusiness._id, dispatch]);
  initalValues = {...initalValues,...globalState.invoiceConfig}
  return (
    <div className='flex items-center justify-center mt-0 mb-10'>
      {loading ? <h1 className='text-center'>Loading...</h1> : <InvoiceForm initialValues={initalValues} />}
    </div>
  )
}

export default Page