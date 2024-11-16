"use client"
import CustomInput from '@/components/reuse/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from "formik";
import { useState } from 'react';
import * as Yup from "yup";


export interface CustomersFormData {
    name: string;
    email:string;
    GSTIN: string;
    PAN: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
}
const CustomersFormSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    email: Yup.string().optional(),
    GSTIN: Yup.string().optional(),
    PAN: Yup.string().optional(),
    phone: Yup.number().integer("Phone Must Be Number").required("Phone Required"),
    street: Yup.string().required("Street Required"),
    city: Yup.string().required("City Required"),
    state: Yup.string().required("State Required"),
    postalCode: Yup.number().integer().required("Postal Code Required")
});

interface FormProps {
    handleFormData: (values: CustomersFormData) => Promise<void>;
    initialValues: CustomersFormData;
    className?: string;
    type?: "Update" | "Create"
}

export const CustomersForm = ({ handleFormData, initialValues, className, type = "Create" }: FormProps) => {
    const [loading, setloading] = useState(false)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CustomersFormSchema}
            onSubmit={ async (values) => {
                setloading(true)
                try {
                    await handleFormData(values);
                } finally {
                    setloading(false)
                }
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className={cn('flex flex-col items-center  space-y-4 pb-10', className)}>
                        <Field
                            label="Customer Name"
                            name="name"
                            placeholder="John Doe"
                            component={CustomInput}
                        />
                        <Field
                            label="Email"
                            name="email"
                            placeholder="jhon@gmail.com"
                            component={CustomInput}
                        />
                        <Field
                            label="Phone"
                            name="phone"
                            placeholder="+91 65865 87744"
                            component={CustomInput}
                        />
                        <Field
                            label="GSTIN"
                            name="GSTIN"
                            placeholder="IUYXCF87GF6Y"
                            component={CustomInput}
                        />
                        <Field
                            label="PAN"
                            name="PAN"
                            placeholder="IUYXCF87GF6Y"
                            component={CustomInput}
                        />
                        <Field
                            label="Street"
                            name="street"
                            placeholder="# 129 Street"
                            component={CustomInput}
                        />
                        <Field
                            label="City"
                            name="city"
                            placeholder="CITY"
                            component={CustomInput}
                        />
                        <Field
                            label="State"
                            name="state"
                            placeholder="Select State"
                            component={CustomInput}
                        />
                        <Field
                            label="Postal Code"
                            name="postalCode"
                            placeholder="577885"
                            component={CustomInput}
                        />
                        <Button
                            type="submit"
                            variant={"default"}
                            disabled={loading}
                            className="mt-4 w-[320px] py-2 px-4 rounded-none border"
                        >
                            {loading? `${type.slice(0, -1)}ing Customer...` : `${type} Customer` }
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
