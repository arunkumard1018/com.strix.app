"use client"
import { bebas_font } from "@/app/fonts/fonts"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NAV_LINKS } from "./NavBar"



export function DrawerDemo() {



    return (
        <Drawer direction="top"  >
            <DrawerTrigger asChild className="mt-0">
                <Menu className='lg:hidden' />
            </DrawerTrigger>
            <DrawerContent className="rounded-none h-screen lg:hidden m-0 p-0 bg-white ">
                <div className="space-y-5">
                    <DrawerHeader className="px-4 py-0 m-0 flex justify-between items-center">
                        <DrawerTitle className={cn(bebas_font.className, "p-0 m-0 text-3xl text-red-400 tracking-widest")}>STRIX INVOICE</DrawerTitle>
                        <DrawerDescription><DrawerClose asChild><X className="text-black" /></DrawerClose></DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col px-4 space-y-3 pt-3">
                        <Button className="rounded-none">Get Started</Button>
                        <Button className='rounded-none border-red-300 md:hidden xl:block' variant={'outline'}>Contact Us</Button>
                        <div className="flex flex-col font-[400] text-black">
                            <div className="py-2 px-2">Log in</div>
                            {NAV_LINKS.map((items) => (
                                <Link href={items.navLink} key={items.text} className="py-2 px-2">{items.text}</Link>
                            ))}
                            <div className="py-2 px-2 flex items-center space-x-2">
                                <Image src={"/svg/search.svg"} alt='' width={25} height={25} className="rounded-full hover:bg-gray-200 hover:bg-opacity-80" />
                                <div>Search</div>
                            </div>
                        </div>
                        </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
