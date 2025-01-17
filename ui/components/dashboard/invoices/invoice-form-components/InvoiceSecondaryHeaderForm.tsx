import CustomInput from '@/components/reuse/invoice-input';
import { Customers } from '@/types/model.definetions';
import { Field, FormikProps } from 'formik';
import React from 'react';
import { ComboboxDemo } from './SelectCustomers';
import { InvoiceFormData } from '../form-data';

interface InvoiceSecondaryHeaderFormProps {
    formik: FormikProps<InvoiceFormData>
}
const InvoiceSecondaryHeaderForm: React.FC<InvoiceSecondaryHeaderFormProps> = ({ formik }) => {
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
                    className="text-sm w-auto" name="invoiceFrom.address" placeholder="Address"
                    component={CustomInput}
                />
                <div className="flex gap-1">
                    <Field
                        className="text-sm w-1/2 self-end" name="invoiceFrom.city" placeholder="City"
                        component={CustomInput}
                    />
                    <Field
                        className="text-sm w-1/2 self-end" name="invoiceFrom.state" placeholder="State"
                        component={CustomInput}
                    />
                </div>
                <Field
                    className="text-sm w-auto" name="invoiceFrom.postalCode" placeholder="PostalCode"
                    component={CustomInput}
                />
                <div className="flex gap-1">
                    <Field
                        className="text-sm w-1/2" name="invoiceFrom.phone" placeholder="Mobie No"
                        component={CustomInput}
                    />
                    <Field
                        className="text-sm w-1/2" name="invoiceFrom.email" placeholder="Email"
                        component={CustomInput}
                    />
                </div>
            </div>
            {/* Invoice To */}
            <div className="ml-2 mt-7 font-bold text-sm">To</div>
            <div className=" mt-2 font-bold text-sm">
                <ComboboxDemo
                    onSelectCustomer={(customers: Customers) => {
                        formik.setFieldValue("invoiceTo", {
                            address: customers.address.street,
                            city: customers.address.city,
                            state: customers.address.state,
                            postalCode: customers.address.postalCode,
                            phone: customers.phone,
                            GSTIN: customers.GSTIN,
                            PAN: customers.PAN,
                            name: customers.name,
                            email: customers.email,
                        });
                        formik.setFieldValue("customers", customers._id);
                    }}
                />
            </div>
            <div className="font-sans ">
                <Field
                    className="text-sm w-auto" name="invoiceTo.name" placeholder="Customer Name"
                    component={CustomInput}
                />
                <Field
                    className="text-sm w-auto" name="invoiceTo.address" placeholder="Address"
                    component={CustomInput}
                />
                <div className="flex gap-1">
                    <Field
                        className="text-sm w-1/2 self-end" name="invoiceTo.city" placeholder="City"
                        component={CustomInput}
                    />
                    <Field
                        className="text-sm w-1/2 self-end" name="invoiceTo.state" placeholder="State"
                        component={CustomInput}
                    />
                </div>
                <Field
                    className="text-sm w-auto" name="invoiceTo.postalCode" placeholder="PostalCode"
                    component={CustomInput}
                />
                <div className="flex gap-1">
                    <Field
                        className="text-sm w-1/2" name="invoiceTo.phone" placeholder="Mobile No"
                        component={CustomInput}
                    />
                    <Field
                        className="text-sm w-1/2" name="invoiceTo.email" placeholder="Email"
                        component={CustomInput}
                    />
                </div>
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