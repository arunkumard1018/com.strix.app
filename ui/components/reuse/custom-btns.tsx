import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const RegisterBtn = ({ text, logo, className, href = "#" }: { text: string, logo: string, href?: string, className?: string }) => {
    return (
        <Link href={href}>
            <div className="google py-3 w-[320px] border border-gray-600 rounded-sm  bg-[#191a24] flex items-center justify-center space-x-3">
                <Image src={logo} alt="" className={cn(className)} width={25} height={25} />
                <p className='px-4 font-medium'>{text}</p>
            </div>
        </Link>
    )
}

export {RegisterBtn}