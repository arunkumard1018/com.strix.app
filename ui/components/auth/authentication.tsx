import { bebas_font } from '@/app/fonts/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface RegisterOrLoginPageProps {
    type: "signIn" | "signUp";
    path: string;
    handleGoogleSignIn?: () => void;
}
function RegisterOrLoginPage({ type, path, handleGoogleSignIn}: RegisterOrLoginPageProps) {
    return (
        <div className='h-screen flex pt-20  md:pt-0 md:items-center justify-center text-center text-white '>
            <div className='space-y-6 mx-2'>
                <h1 className={cn(bebas_font.className, "p-0 m-0 text-4xl text-red-400 tracking-widest")}>STRIX INVOICE</h1>

                <div className=" w-[370px] md:w-[390px] shadow-xl border border-gray-800 rounded-md space-y-4 py-10">
                    <h2 className='text-2xl font-extrabold mb-10'>{type === "signUp" ? "Create an Account" : "Sign  In to Strix Invoice"}</h2>
                    <div onClick={handleGoogleSignIn}><RegisterBtn text={type === "signUp" ? "Sign Up With Google" : "Sign In With Google"} logo='/img/social/google.png' /></div>
                    <div><RegisterBtn text={type === "signUp" ? "Sign Up With Apple" : "Sign In With Apple"} logo='/img/social/apple.png' className="invert-[2]" /></div>
                    <div><RegisterBtn href={`${path}/email`} text={type === "signUp" ? "Sign Up With Email" : "Sign In With Email"} logo='/img/social/email.png' className="invert-[2]" /></div>
                </div>

                <div className='text-gray-400 space-y-2'>
                    <p>{type === "signUp" ? "Already Have an Account?" : "Don't Have an Acount Yet?"}</p>
                    <Link href={type === "signUp" ? "/auth/login" : "/auth/register"}>
                        <button className='px-1 bg-gray-800 border border-gray-600 rounded-sm font-bold'>{type === "signUp" ? "Sign In" : "Sign Up"}</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const RegisterBtn = ({ text, logo, className, href = "#" }: { text: string, logo: string, href?: string, className?: string }) => {
    return (
        <Link href={href}>
            <div className="google py-3 border border-gray-600 rounded-sm  bg-[#191a24] mx-6 flex items-center justify-center">
                <Image src={logo} alt="" className={cn(className)} width={20} height={20} />
                <p className='px-4'>{text}</p>
            </div>
        </Link>
    )
}
export default RegisterOrLoginPage