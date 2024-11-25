'use client'
import { HERO_PAGE_CONTENT } from '@/config/hero-page-config'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn("md:w-[80vw] md:mx-auto", className)}>
            <div className="grid md:grid-cols-2 gap-4 py-10 md:py-20">
                <div className=''>
                    <h2 className="text-4xl  font-bold">Strix Invoice</h2>
                    <p className="mt-2">{HERO_PAGE_CONTENT.footer.description}</p>
                    <div className="flex mt-4 space-x-1 items-center">
                        <div><Image src="/icons/play-store.png" alt="" className="w" width={25} height={25} /></div>
                        <div>Download on Play Store</div>
                    </div>
                    <div className='flex py-4 space-x-4'>
                        <Link href="#"><div className='relative size-5'><Image src="/svg/twitter.svg" alt="" className="w" fill /></div></Link>
                        <Link href="#"><div className='relative size-5'><Image src="/svg/facebook.svg" alt="" className="w" fill /></div></Link>
                        <Link href="#"><div className='relative size-5'><Image src="/svg/insta.svg" alt="" className="w" fill /></div></Link>
                    </div>
                </div>

                <div className='hidden w-full md:flex justify-end gap-16'>
                    {HERO_PAGE_CONTENT.footer.FooterLinks.map((item, index) => (
                        <div key={index * 5}>
                            <h3 className="font-bold text-xl">{item.title}</h3>
                            {item.paths.map((data) => (
                                <ul className="mt-2 space-y-1 font-medium text-sm" key={data.link}>
                                    <Link href={data.link} ><li>{data.title}</li></Link>
                                </ul>
                            ))}
                        </div>
                    ))}
                </div>

                <Accordion type="single" collapsible className="w-full md:hidden">
                    {HERO_PAGE_CONTENT.footer.FooterLinks.map((item, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={`item-${index + 1}`}>
                            <AccordionTrigger className='text-xl'>{item.title}</AccordionTrigger>
                            <AccordionContent>
                                <AccordianItems item={item.paths} className="text-md mb-4" />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className=" text-center text-sm pb-4 md:py-4">
                &copy; 2024 Striix Invoice. All rights reserved.
            </div>

        </footer>
    )
}

const AccordianItems = ({ item, className }: { item: { title: string, link: string }[], className: string }) => {
    return (
        <ul className=''>
            {item.map((data, index) => (
                <li key={index * 5} className={cn(className)}>{data.title}</li>
            ))}
        </ul>
    )
}

export { Footer }
