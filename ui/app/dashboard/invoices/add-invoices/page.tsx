/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { getInvoiceConfig } from '@/api/invoiceConfig';
import { InvoiceForm } from '@/components/dashboard/invoices/invoices-form';
import { InvoiceConfig, InvoiceFormData } from '@/components/dashboard/invoices/types';
import { invoiceFormInitialData } from '@/config/invoice';
import { setInvoiceConfig } from '@/store/slices/configSlice';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Page() {
  const [initialValues, setInitialValues] = useState<InvoiceFormData>(invoiceFormInitialData)
  const activeBusiness = useSelector((state: RootState) => state.authContext.activeBusiness);
  const config = useSelector((state: RootState) => state.config);
  const [loading, setLoading] = useState(false)
  const storedInvoiceConfig = config.invoiceConfig;
  const storedConfigBusinessId = config.businessId;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true)
  //     try {
  //       const response = await getInvoiceConfig(activeBusiness._id);
  //       console.log("Res Result",response.result)
  //       if (response.result) {
  //         const config: InvoiceConfig = {
  //           ...response.result,
  //           additionlInfo: {
  //             ...response.result.additionlInfo,
  //             isBankDetails: true
  //           }
  //         }
  //         dispatch(setInvoiceConfig({ invoiceConfig: config, businessId: activeBusiness._id }));
  //         setInitialValues({
  //           ...initialValues, invoiceDetails: { ...config.invoiceDetails, invoiceDate: new Date() }
  //         })
  //       }
  //     } catch (_error) {
  //       setInitialValues({
  //         ...initialValues, invoiceDetails: { ...initialValues.invoiceDetails, invoiceDate: new Date() }
  //       })
  //     } finally {
  //       setLoading(false)
  //     }
  //     console.log("Calling Api");
  //     setLoading(false)
  //   };
  //   loadData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeBusiness._id])


  return (
    <div className='flex items-center justify-center mt-0 mb-10'>
      {loading ? <div className='text-xl text-center text-green-500'>Loading...</div> : <InvoiceForm initialValues={initialValues} />}
    </div>
  )
}

export default Page