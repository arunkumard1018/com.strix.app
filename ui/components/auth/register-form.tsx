"use client"
import { bebas_font } from '@/app/fonts/fonts';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from "formik";
import Link from 'next/link';
import * as Yup from "yup";
import CustomInput from '../reuse/input';
import { useRouter } from 'next/navigation';

const SignInSchema = Yup.object().shape({
  name : Yup.string().required("Name Required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("You Must Enter a Password")
    .min(4, "Password is too short - should be 4 chars minimum"),
});

const initialValues = {
  name : "",
  email: "",
  password: ""
};

function RegisterForm() {
  const type = "signUp"
  return (
    <div className='bg-custome-black'>
      <div className='h-screen flex pt-20  md:pt-0 md:items-center justify-center text-center text-white '>
        <div className='space-y-6 mx-2'>
          <h1 className={cn(bebas_font.className, "p-0 m-0 text-4xl text-red-400 tracking-widest")}>STRIX INVOICE</h1>
          <div className=" w-[370px] md:w-[390px] shadow-xl border border-gray-800 rounded-md space-y-4 py-10">
            <h2 className='text-2xl font-extrabold mb-10'>{"Create an Account"}</h2>

            {/* Add the Registeration Form */}
            <UserRegisterForm />

          </div>
          <div className='text-gray-400 space-y-2'>
            <p>{"Already Have an Account?"}</p>
            <Link href={type === "signUp" ? "/auth/login" : "/auth/register"}>
              <button className='px-1 bg-gray-800 border border-gray-600 rounded-sm font-bold'>{"Sign In"}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserRegisterForm = () => {
  const router = useRouter();
  console.log(router)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        console.log('Form data', values);
        if(values.name === "Arun"){
          router.push("/")
        }

      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center space-y-4'>
          <Field
              name="name"
              placeholder="John Doe"
              component={CustomInput}
            />
            <Field
              name="email"
              placeholder="John@gmail.com"
              component={CustomInput}
            />
            <Field
              name="password"
              additionalInfo = "The password must be more than seven characters long and contain at least one uppercase character"
              placeholder="Password"
              component={CustomInput}
            />
            
            <button
              type="submit"
              className="mt-4 w-[320px] py-2 px-4 bg-[#7898ff] text-black rounded font-medium"
            >
              Create Account
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};


export default RegisterForm