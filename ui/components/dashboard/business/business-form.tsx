"use client"
import CustomInput from '@/components/reuse/input';
import CustomSelect from '@/components/reuse/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";


export interface BusinessFormData {
    name: string;
    catagory: string;
    GSTIN: string;
    hsn: string;
    phone: string;
    invoicePrefix: string
    stateCode: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    logo: string;
}
const BusinessFormSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    catagory: Yup.string().required("Catagory is required"),
    invoicePrefix: Yup.string().required("required"),
    GSTIN: Yup.string().optional(),
    hsn: Yup.number().integer("HSN Must Be Number").optional(),
    phone: Yup.number().integer("Phone Must Be Number").required("Phone Required"),
    stateCode: Yup.number().integer("HSN Must Be Number").optional(),
    street: Yup.string().required("Street Required"),
    city: Yup.string().required("City Required"),
    state: Yup.string().required("State Required"),
    postalCode: Yup.number()
        .transform((originalValue) =>
            /^\d+$/.test(originalValue) ? parseInt(originalValue, 10) : NaN
        )
        .required("Postal Code is required")
        .typeError("Postal Code must be a valid number")
        .integer("Postal Code must be an integer"),
});

interface OnBoardingFormProps {
    handleBusinessFormData: (values: BusinessFormData) => void;
    initialValues: BusinessFormData;
    className?: string;
    type?: "Update" | "Create"
}

export const BusinessForm = ({ handleBusinessFormData, initialValues, className, type = "Create" }: OnBoardingFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={BusinessFormSchema}
            onSubmit={(values) => {
                console.log(values)
                handleBusinessFormData(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className={cn('flex flex-col items-center  space-y-4 pb-10', className)}>
                        <Field
                            label="Business Name"
                            name="name"
                            placeholder="John Doe"
                            component={CustomInput}
                        />
                        <Field
                            label="Catagory"
                            name="catagory"
                            placeholder="Select Catagory"
                            selectOptions={["Retail", "Transport", "Enterprise"]}
                            component={CustomSelect}
                        />
                        <Field
                            label="GSTIN"
                            name="GSTIN"
                            placeholder="IUYXCF87GF6Y"
                            component={CustomInput}
                        />
                        <div className='flex space-x-2'>
                            <Field
                                label="HSN"
                                name="hsn"
                                placeholder="22"
                                className="w-[160px]"
                                component={CustomInput}
                            />
                            <Field
                                label="State Code"
                                name="stateCode"
                                placeholder="22"
                                className="w-[160px]"
                                component={CustomInput}
                            />
                        </div>
                        <div className='flex space-x-2'>
                            <Field
                                label="Invoice Prefix"
                                name="invoicePrefix"
                                placeholder="INV-"
                                className="w-[120px]"
                                component={CustomInput}
                            />
                            <Field
                                label="Phone"
                                name="phone"
                                placeholder="+91 97855 85665"
                                className="w-[200px]"
                                component={CustomInput}
                            />
                        </div>
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
                            className="mt-4 w-[320px] py-2 px-4 rounded-none border "
                        >
                            {`${type} Business`}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
