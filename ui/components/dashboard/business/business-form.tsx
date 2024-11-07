"use client"
import CustomInput from '@/components/reuse/input';
import CustomSelect from '@/components/reuse/select';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";


export interface BusinessFormData {
    name: string;
    catagory: string;
    GSTIN: string;
    hsn: string;
    stateCode : string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    logo:string;
}
const BusinessFormSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    catagory: Yup.string().required("Catagory is required"),
    GSTIN: Yup.string().optional(),
    hsn: Yup.number().integer("HSN Must Be Number").optional(),
    stateCode: Yup.number().integer("HSN Must Be Number").optional(),
    street: Yup.string().required("Street Required"),
    city: Yup.string().required("City Required"),
    state: Yup.string().required("State Required"),
    postalCode: Yup.number().integer().required("Postal Code Required")
});

interface OnBoardingFormProps {
    handleBusinessFormData: (values: BusinessFormData) => void;
    initialValues: BusinessFormData;
    className ? :string; 
}

export const BusinessForm = ({ handleBusinessFormData, initialValues,className }: OnBoardingFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={BusinessFormSchema}
            onSubmit={(values) => {
                handleBusinessFormData(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className={cn('flex flex-col items-center  space-y-4 pb-10',className)}>
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
                        <Field
                            label="HSN"
                            name="hsn"
                            placeholder="22"
                            component={CustomInput}
                        />
                        <Field
                            label="State Code"
                            name="stateCode"
                            placeholder="22"
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
                        <button
                            type="submit"
                            className="mt-4 w-[320px] py-2 px-4 bg-[#7898ff] text-black rounded font-medium"
                        >
                            Create Business
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
