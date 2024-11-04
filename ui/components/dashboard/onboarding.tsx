"use client"
import { bebas_font } from '@/app/fonts/fonts';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '../reuse/input';
import CustomSelect from '../reuse/select';
import { useDispatch } from 'react-redux';
import { addBusiness } from '@/store/slices/userSlice';

interface values {
    name: string;
    catagory: string;
    GSTIN: string;
    hsn: number | unknown;
    street: string;
    city: string;
    state: string;
    postalCode: number|unknown;
}
function OnboardingPage() {
    const dispatch = useDispatch();
    const handleOnBoarding = async (values: values) => {
        const uuid =  Math.floor(Math.random() * (999999 - 33333 + 1)) + 33333;
        try {
            console.log(values)
            dispatch(addBusiness({_id:uuid,name:values.name}));
        } catch (error) {
            /** Registerartion Form Errors to Be Implemented  */
            console.log("Error While Registering", (error as Error).message)
        }
    }
    return (
        <div className='bg-custome-black min-h-screen flex items-center justify-center md:pt-10'>
            <div className='  text-center text-white '>
                <div className='space-y-4 mx-2'>
                    <h1 className={cn(bebas_font.className, "p-0 m-0 text-4xl text-red-400 tracking-widest")}>STRIX INVOICE</h1>
                    <div className=" w-[370px] md:w-[390px] shadow-xl border border-gray-800 rounded-md space-y-4 py-5">

                        {/* Add the Registeration Form */}
                        <UserRegisterForm handleOnBoarding={handleOnBoarding} />
                    </div>

                </div>
            </div>
        </div>
    )
}


const SignInSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    catagory: Yup.string().required("Catagory is required"),
    GSTIN: Yup.string().optional(),
    hsn: Yup.number().integer("HSN Must Be Number").optional(),
    street: Yup.string().required("Street Required"),
    city: Yup.string().required("City Required"),
    state: Yup.string().required("State Required"),
    postalCode: Yup.number().integer().required("Postal Code Required")
});

const initialValues = {
    name: "",
    catagory: "",
    GSTIN: "",
    hsn: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
};


interface OnBoardingFormProps {
    handleOnBoarding: (values: values) => void
}

const UserRegisterForm = ({ handleOnBoarding }: OnBoardingFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
                handleOnBoarding(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center space-y-4'>
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


export default OnboardingPage