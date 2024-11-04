"use client"
import { AuthResponse, registerUser } from '@/api/auth';
import { bebas_font } from '@/app/fonts/fonts';
import { cn } from '@/lib/utils';
import { setUserData } from '@/store/slices/userSlice';
import { ApiResponse } from '@/types/api-responses';
import { Field, Form, Formik } from "formik";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { RegisterBtn } from '../reuse/custom-btns';
import CustomInput from '../reuse/input';

const SignInSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("You Must Enter a Password")
    .min(4, "Password is too short - should be 4 chars minimum"),
});

const initialValues = {
  name: "",
  email: "",
  password: ""
};

function RegisterForm({ handleGoogleSignIn }: { handleGoogleSignIn: () => void }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleRegisterUser = async (name: string, email: string, password: string) => {
    try {
      const response: ApiResponse<AuthResponse> = await registerUser(name, email, password);
      if (response.result) {
        console.log("SETING RESPONSE CONTEXT")
        dispatch(setUserData(response.result?.user));
        router.push("/dashboard")
      }
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
            <h2 className='text-2xl font-extrabold '>{"Create An Account"}</h2>

            {/* Add the Registeration Form */}
            <UserRegisterForm handleRegisterUser={handleRegisterUser} />
            <div>OR</div>
            <div onClick={handleGoogleSignIn} className='flex items-center justify-center'>
              <RegisterBtn text={"Continue With Google"} logo='/img/social/google.png' />
            </div>
            <div className='text-gray-400'>
              <p className='py-1'>{"Already Have an Account?"}</p>
              <Link href={"/auth/login"}>
                <button className='px-1 bg-gray-800 border border-gray-600 rounded-sm font-bold'>{"Sign In"}</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

interface RegFormProps {
  handleRegisterUser: (name: string, email: string, password: string) => void
}

const UserRegisterForm = ({ handleRegisterUser }: RegFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        const { name, email, password } = values;
        handleRegisterUser(name, email, password);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center space-y-4'>
            <Field
              label="Full Name"
              name="name"
              placeholder="John Doe"
              component={CustomInput}
            />
            <Field
              label="email"
              name="email"
              placeholder="John@gmail.com"
              component={CustomInput}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              additionalInfo="The password must be more than seven characters long and contain at least one uppercase character"
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