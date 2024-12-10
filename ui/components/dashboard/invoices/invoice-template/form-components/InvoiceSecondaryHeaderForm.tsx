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
            <div className="ml-2 font-bold text-sm">From</div>
            {/* Invoice From */}
            <div className="font-sans">
                <Field
                    className="text-sm w-auto" name="invoiceFrom.name" placeholder="Name"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceFrom.street" placeholder="Address"
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
                    className="text-sm w-auto" name="invoiceFrom.postalCode" placeholder="PostalCode"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceFrom.phone" placeholder="Mobie No"
                    component={CustomInput}
                />
            </div>
            {/* Invoice To */}
            <div className="ml-2 mt-7 font-bold text-sm">To</div>
            <div className="font-sans ">
                <Field
                    className="text-sm w-auto" name="invoiceTo.name" placeholder="Customer Name"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.street" placeholder="Address"
                    component={CustomInput}
                />
                <div className="flex gap-1">
                    <Field
                        className="text-sm w-1/2" name="invoiceTo.city" placeholder="City"
                        component={CustomInput}
                    />
                    <Field
                        className="text-sm w-1/2" name="invoiceTo.state" placeholder="State"
                        component={CustomInput}
                    />
                </div>
                <Field
                    className="text-sm w-auto" name="invoiceTo.postalCode" placeholder="PostalCode"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.phone" placeholder="Mobile No"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.GSTIN" placeholder="GSTIN"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.PAN" placeholder="PAN"
                    component={CustomInput}
                />
            </div>
        </div>
    )
}

export default InvoiceSecondaryHeaderForm