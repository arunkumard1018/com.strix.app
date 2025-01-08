import { InvoiceForm } from '@/components/dashboard/invoices/invoices-form';
import { invoiceFormInitialData } from '@/config/invoice';


function Page() {
  return (
    <div className='flex items-center justify-center mt-0 mb-10'>
      <InvoiceForm initialValues={invoiceFormInitialData} type="CREATE" />
    </div>
  )
}

export default Page