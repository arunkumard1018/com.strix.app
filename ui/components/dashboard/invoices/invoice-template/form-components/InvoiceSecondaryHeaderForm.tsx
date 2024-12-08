import CustomInput from '@/components/reuse/invoice-input';
import { Field, FormikProps } from 'formik';
import React from 'react';
import { InvoiceFormData } from '../../types';


interface InvoiceSecondaryHeaderFormProps {
    handleChange: FormikProps<InvoiceFormData>["handleChange"];
}


const InvoiceSecondaryHeaderForm: React.FC<InvoiceSecondaryHeaderFormProps> = () => {
    return (
        <div className="w-full md:w-1/2 ">
            <div className="ml-2 font-bold text-sm">FROM</div>
            {/* Invoice From */}
            <div className="font-sans">
                <Field
                    className="text-sm w-auto" name="invoiceFrom.name" placeholder="INVOICE"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceFrom.street" placeholder="INVOICE"
                    component={CustomInput}
                />
                <div className="flex gap-1">
                    <Field
                        className="text-sm w-1/2" name="invoiceFrom.city" placeholder="City"
                        component={CustomInput}
                    />
                    <Field
                        className="text-sm w-1/2" name="invoiceFrom.state" placeholder="State"
                        component={CustomInput}
                    />
                </div>
                <Field
                    className="text-sm w-auto" name="invoiceFrom.postalCode" placeholder="INVOICE"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceFrom.phone" placeholder="INVOICE"
                    component={CustomInput}
                />
            </div>
            {/* Invoice To */}
            <div className="ml-2 mt-7 font-bold text-sm">TO</div>
            <div className="font-sans ">
                <Field
                    className="text-sm w-auto" name="invoiceTo.name" placeholder="INVOICE"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.street" placeholder="INVOICE"
                    component={CustomInput}
                />
                <div className="flex gap-1">
                    <Field
                        className="text-sm w-1/2" name="invoiceTo.city" placeholder="INVOICE"
                        component={CustomInput}
                    />
                    <Field
                        className="text-sm w-1/2" name="invoiceTo.state" placeholder="INVOICE"
                        component={CustomInput}
                    />
                </div>
                <Field
                    className="text-sm w-auto" name="invoiceTo.postalCode" placeholder="INVOICE"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.phone" placeholder="INVOICE"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.GSTIN" placeholder="FASD76FSAF6"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.PAN" placeholder="BHJ766FASD"
                    component={CustomInput}
                />
            </div>
        </div>
    )
}

export default InvoiceSecondaryHeaderForm