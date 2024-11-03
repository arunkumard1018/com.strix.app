import React from 'react'
import BoxReveal from '../ui/box-reveal'
import { Button } from '../ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'

function HeroComponent() {
    return (
        <div className='space-y-4 md:space-y-0 md:flex items-center md:justify-between mx-2 md:h-[90vh] '>
            <div className='md:h-[80vh] w-auto md:w-2/5 flex items-center '><HeroBoxReveal className='w-full' /></div>
            <div className='w-full md:w-3/5 h-[50vh] md:h-[80vh] relative'>
                <div className=''><Image alt='' src="/img/hero-img.jpg" fill priority/></div>
            </div>
        </div>
    )
}


function HeroBoxReveal({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <div className={cn("size-full  items-center justify-center overflow-hidden w-full md:space-y-10")}>
                <BoxReveal boxColor={"#f36458"} duration={0.5}>
                    <p className="text-5xl md:text-[4.5rem]  font-semibold">
                        Strix Invoice<span className="text-[#f36458]">.</span>
                    </p>
                </BoxReveal>
                <BoxReveal boxColor={"#f36458"} duration={0.5}>
                    <h2 className="mt-[.5rem] text-[1rem]">
                        Free Invoicing Software to create{" "}
                        <span className="text-[#f36458]">Invoices in Seconds</span>
                    </h2>
                </BoxReveal>
                <div className="mt-6">
                    <p>
                        -&gt; Manage invoices, Track payments, and generate reports—all in one place. StrixInvoice makes running your business
                        <span className="font-semibold text-[#5046e6]">  Simple</span>,
                        <span className="font-semibold text-[#5046e6]"> Fast</span>,
                        and
                        <span className="font-semibold text-[#5046e6]"> stress-free</span>
                        . <br />
                        -&gt; 100% No WaterMark or Branding. <br />
                    </p>
                </div>
                <BoxReveal boxColor={"#f36458"} duration={0.5}>
                    <Button className="mt-[1.6rem] bg-[#f36458]">Explore Demo</Button>
                </BoxReveal>
            </div>
        </div>
    )
}

export default HeroComponent