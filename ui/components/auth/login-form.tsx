import { authenticate, AuthResponse } from '@/api/auth';
import { bebas_font } from '@/app/fonts/fonts';
import { cn } from '@/lib/utils';
import { setUserData } from '@/store/slices/userSlice';
import { ApiResponse } from '@/types/api-responses';
import { AxiosError } from 'axios';
import { Field, Form, Formik } from "formik";
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { RegisterBtn } from '../reuse/custom-btns';
import CustomInput from '../reuse/input';
import { Alert, AlertDescription } from '../ui/alert';


const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("You Must Enter a Password")
        .min(4, "Password is too short - should be 4 chars minimum"),
});

const initialValues = {
    email: "",
    password: ""
};


function LoginForm({ handleGoogleSignIn }: { handleGoogleSignIn: () => void }) {
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Inavlid Credentials!")
    const router = useRouter()
    const dispatch = useDispatch();
    const doLogin = async (email: string, password: string) => {
        try {
            const response: ApiResponse<AuthResponse> = await authenticate(email, password);
            if (response.result) {
                dispatch(setUserData(response.result.user));
                router.push("/dashboard");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (!error.response) setErrorMessage("Unable to Process Request Please Try again after some times");
                else setErrorMessage(error.response.data.error);
            }
            setIsError(true);
        }
    }

    return (
        <div className='bg-custome-black md:h-screen'>
            <div className='h-screen flex pt-20  md:pt-0 md:items-center justify-center text-center text-white '>
                <div className='space-y-6 mx-2'>
                    <h1 className={cn(bebas_font.className, "p-0 m-0 text-4xl text-red-400 tracking-widest")}>STRIX INVOICE</h1>
                    {isError &&
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className='max-w-[320px]'>
                                {errorMessage}
                            </AlertDescription>
                        </Alert>
                    }
                    <div className=" w-[370px] md:w-[390px] shadow-xl border border-gray-800 rounded-md space-y-4 py-10">
                        <h2 className='text-2xl font-extrabold mb-10'>{"Sign In"}</h2>
                        <UserLoginForm doLogin={doLogin} />
                        <div>OR</div>
                        <div onClick={handleGoogleSignIn} className='flex items-center justify-center'>
                            <RegisterBtn text={"Continue With Google"} logo='/img/social/google.png' />
                        </div>
                    </div>
                    <div className='text-gray-400 space-y-2'>
                        <p>{"Don't Have an Account Yet?"}</p>
                        <Link href={"/auth/register"}>
                            <button className='px-1 bg-gray-800 border border-gray-600 rounded-sm font-bold'>{"Sign Up"}</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


const UserLoginForm = ({ doLogin }: { doLogin: (email: string, password: string) => Promise<void> }) => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={async (values) => {
                const { email, password } = values;
                await doLogin(email, password);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center space-y-4'>
                        <Field
                            label="Email"
                            name="email"
                            placeholder="John@gmail.com"
                            component={CustomInput}
                        />
                        <Field
                            label="Password"
                            name="password"
                            type='password'
                            placeholder="Password"
                            component={CustomInput}
                        />
                        <button
                            type="submit"
                            className="mt-4 w-[320px] py-2 px-4 bg-[#7898ff] text-black rounded font-medium"
                        >
                            Login
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


export default LoginForm