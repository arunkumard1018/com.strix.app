import { Field, FormikProps } from 'formik';
import React from 'react'
import CustomInput from '@/components/reuse/invoice-input';
import { InvoiceFormData } from '../../types';


interface InvoiceHeaderFormProps {
    handleChange: FormikProps<InvoiceFormData>["handleChange"];
}

const InvoiceHeaderForm: React.FC<InvoiceHeaderFormProps> = () => {
    return (
        <div className='md:flex justify-between w-full p-4'>
            <div className='w-full md:w-1/2 '>
                <div className='text-2xl w-full md:text-4xl font-medium '>
                    <Field
                        className="w-auto border-none outline-none"
                        name="inoviceheading.heading"
                        placeholder="Strix Invoice"
                        component={CustomInput}
                    />
                </div>
                <div className='text-sm italic'>
                    <Field
                        className="text-sm w-auto"
                        name="inoviceheading.subHeading"
                        placeholder="Transport"
                        component={CustomInput}
                    />
                </div>
            </div>
            <div className='w-full md:w-1/2 flex items-start md:justify-end'>
                <div className='md:w-2/3 w-full'>
                    <div className='text-2xl w-full font-extrabold text-custome-textVoilate'>
                        <Field
                            className=" w-auto"
                            name="inoviceheading.title"
                            placeholder="INVOICE"
                            component={CustomInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceHeaderForm