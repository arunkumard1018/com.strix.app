import { bebas_font } from '@/app/fonts/fonts';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from "formik";
import Link from 'next/link';
import * as Yup from "yup";
import CustomInput from '../reuse/input';
import { useRouter } from 'next/navigation';


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


function LoginForm() {
    return (
        <div className='bg-custome-black md:h-screen'>
            <div className='h-screen flex pt-20  md:pt-0 md:items-center justify-center text-center text-white '>
                <div className='space-y-6 mx-2'>
                    <h1 className={cn(bebas_font.className, "p-0 m-0 text-4xl text-red-400 tracking-widest")}>STRIX INVOICE</h1>

                    <div className=" w-[370px] md:w-[390px] shadow-xl border border-gray-800 rounded-md space-y-4 py-10">
                        <h2 className='text-2xl font-extrabold mb-10'>{"Sign In"}</h2>

                        <UserLoginForm/>
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



const UserLoginForm = () => {
    const router = useRouter()
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
                console.log('Form data', values);
                if (values.email === "Arun") {
                    router.push("/")
                }

            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center space-y-4'>
                        <Field
                            name="email"
                            placeholder="John@gmail.com"
                            component={CustomInput}
                        />
                        <Field
                            name="password"
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