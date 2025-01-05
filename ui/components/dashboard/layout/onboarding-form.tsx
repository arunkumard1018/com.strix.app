"use client"
import CustomInput from '@/components/reuse/input';
import CustomSelect from '@/components/reuse/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";


export interface OnBoardingFormData {
    name: string;
    catagory: string;
    phone: string;
    invoicePrefix: string
    city: string;
    logo: string;
}
const OnBoardingFormSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    catagory: Yup.string().required("Catagory is required"),
    invoicePrefix: Yup.string().required("required"),
    phone: Yup.number()
        .transform((originalValue) =>
            /^\d+$/.test(originalValue) ? parseInt(originalValue, 10) : NaN
        )
        .required("Phone Required")
        .typeError("Phone must be a valid number")
        .integer("Phone Must Be Number"),
    city: Yup.string().required("City Required"),
});

interface OnBoardingFormProps {
    handleOnBoardingFormData: (values: OnBoardingFormData) => void;
    initialValues: OnBoardingFormData;
    className?: string;
    type?: string;
}

export const OnboardingForm = ({ handleOnBoardingFormData, initialValues, className, type }: OnBoardingFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={OnBoardingFormSchema}
            onSubmit={(values) => {
                console.log(values)
                handleOnBoardingFormData(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className={cn('flex flex-col items-center  space-y-4 pb-10', className)}>
                        <Field
                            label="Business Name"
                            name="name"
                            placeholder="ABC Enterprise"
                            component={CustomInput}
                        />
                        <Field
                            label="Catagory"
                            name="catagory"
                            placeholder="Select Catagory"
                            selectOptions={["Retail", "Transport", "Enterprise"]}
                            component={CustomSelect}
                        />
                        {type !== "Update" && <Field
                            label="Invoice Prefix"
                            name="invoicePrefix"
                            placeholder="INV-"
                            component={CustomInput}
                        />}
                        <Field
                            label="Phone"
                            name="phone"
                            placeholder="97855 85665"
                            component={CustomInput}
                        />
                        <Field
                            label="City"
                            name="city"
                            placeholder="CITY"
                            component={CustomInput}
                        />
                        <Button
                            type="submit"
                            variant={"default"}
                            className="mt-4 w-[320px] py-2 px-4 rounded-none border "
                        >
                            {`Save and Continue`}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
