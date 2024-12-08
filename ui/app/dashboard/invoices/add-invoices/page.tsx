"use client"
import { InvoiceForm } from '@/components/dashboard/invoices/invoices-form';
import { invoiceFormInitialData } from '@/config/invoice';


function Page() {
  const initalValues = invoiceFormInitialData;
  return (
    <div className='flex items-center justify-center mt-0 mb-10'>
      <InvoiceForm initialValues={initalValues} />
    </div>
  )
}

export default Page