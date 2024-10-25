
import { cn } from "@/lib/utils"
import Image from "next/image"
import GradualSpacing from "../ui/gradual-spacing"

export const images = ["/img/dashboard/dash-1.png", "/img/dashboard/dash-2.png", "/img/dashboard/dash-3.png", "/img/dashboard/dash-4.png"]

function SecondaryHero({ className }: { className?: string }) {
    return (
        <div className={cn(" md:h-screen flex flex-col items-center justify-center", className)}>
            <GradualSpacing
                className="hidden md:block font-display text-center text-xl font-bold -tracking-widest  text-black dark:text-white md:text-4xl md:leading-[5rem]"
                text="Transform Your Invoicing Experience with StrixInvoice"
            />
            <GradualSpacing
                className="md:hidden font-display text-center text-xl font-bold -tracking-widest  text-black dark:text-white md:text-4xl md:leading-[5rem]"
                text="Transform Your Invoicing"
            />
            <GradualSpacing
                className="md:hidden font-display text-center text-xl font-bold -tracking-widest text-black dark:text-white md:text-4xl md:leading-[5rem]"
                text="Experience with StrixInvoice"
            />
            <p className="text-center pt-2 md:pt-0 text-xs md:text-xl">StrixInvoice simplifies invoicing, making it the easiest part of running your business</p>
            <div className="relative w-full h-[50vh] md:w-[75vw] md:h-[125vh] mt-20 ">
                <Image src={"/img/dashboard/dash-5.png"} alt="" fill className="rounded-md" />
            </div>
        </div>
    )
}



export default SecondaryHero