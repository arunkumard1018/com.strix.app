import { Field, FormikProps } from 'formik';
import React from 'react'
import CustomInput from '@/components/reuse/invoice-input';
import { InvoiceFormData } from '../form-data';

interface InvoiceHeaderFormProps {
    handleChange: FormikProps<InvoiceFormData>["handleChange"];
}

const InvoiceHeaderForm: React.FC<InvoiceHeaderFormProps> = () => {
    return (
        <div className='md:flex justify-between w-full p-4'>
            <div className='w-full md:w-1/2 '>
                <div className='text-2xl w-full  font-medium '>
                    <Field
                        className="w-auto border-none outline-none"
                        inputClassName="md:text-4xl"
                        name="invoiceHeading.heading"
                        placeholder="Strix Invoice"
                        component={CustomInput}
                    />
                </div>
                <div className='text-sm italic'>
                    <Field
                        className="text-sm w-auto"
                        name="invoiceHeading.subHeading"
                        placeholder="Transport"
                        component={CustomInput}
                    />
                </div>
            </div>
            <div className='w-full md:w-1/2 flex items-start md:justify-end'>
                <div className='md:w-2/3 w-full'>
                    <div className='text-2xl w-full font-extrabold '>
                        <Field
                            className=" w-auto"
                            name="invoiceHeading.title"
                            placeholder="TAX INVOICE"
                            component={CustomInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceHeaderForm