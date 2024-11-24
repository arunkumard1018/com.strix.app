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
                    <DrawerHeader className="px-4 py-0 mt-5 flex justify-between items-center">
                        <Link href={"/"}><DrawerTitle className={cn(bebas_font.className, "p-0 m-0 text-3xl text-red-400 tracking-wider")}>STRIX INVOICE</DrawerTitle></Link>
                        <DrawerDescription><DrawerClose asChild><X className="text-black" /></DrawerClose></DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col px-4 space-y-3 pt-3">
                        <Link href={"/auth/register"} className="block w-full"><Button className="rounded-none w-full">Get Started</Button></Link>
                        <Button className='rounded-none border-red-300 md:hidden xl:block' variant={'outline'}>Contact Us</Button>
                        <Link href={"/auth/login"} className="block w-full border border-red-300"><Button className="rounded-none w-full" variant={"outline"}>Login</Button></Link>
                        <div className="flex flex-col font-[400] text-black">
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
