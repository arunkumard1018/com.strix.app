"use client"
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Image from 'next/image'
import { useState } from 'react'

function Features() {
    const [currentFeature, setcurrentFeature] = useState<string>("Studio")

    function changeFeature(name: string) {
        setcurrentFeature(name);
    }
    return (
        <div className='flex flex-col items-center space-y-10 pt-10  mt-10 w-[80vw] mx-auto py-auto text-white '>
            <div>
                <p className='text-center text-xl md:text-3xl font-medium'>Comprehensive solutions for all your invoicing needs, effortlessly covered</p>
                <p className='py-2 text-center text-muted'>Create polished, professional quotes for your clients that can quickly be turned into invoices—faster than you can say, Let&apos;s go!</p>
            </div>
            <Tabs defaultValue="Studio" className="flex-col items-center justify-items-center space-y-5 w-full ">
                <TabsList className='flex  bg-[#1b1d20] rounded-full font-bold'>
                    <Btn className={cn(currentFeature === "Studio" && "bg-custome-orange", currentFeature !== "Studio" && "hover:bg-gray-800")}><TabsTrigger value="Studio" onClick={() => changeFeature("Studio")} >Studio</TabsTrigger></Btn>
                    <Btn className={cn(currentFeature === "Api" && "bg-custome-orange", currentFeature !== "Api" && "hover:bg-gray-800")}><TabsTrigger value="Api" onClick={() => changeFeature("Api")} >Api</TabsTrigger></Btn>
                    <Btn className={cn(currentFeature === "Content Lake" && "bg-custome-orange", currentFeature !== "Content Lake" && "hover:bg-gray-800")}><TabsTrigger value="Content Lake" onClick={() => changeFeature("Content Lake")} >Content Lake</TabsTrigger></Btn>
                </TabsList>
                <div className='w-full'>
                    <h3 className='text-2xl font-bold text-center my-4'>Professional-Looking Invoices</h3>
                    <FeatuesTabsContent value='Studio' image='/img/dashboard/dash-cp-bg-m.png' />
                    <FeatuesTabsContent value='Api' image='/img/dashboard/lap.png' />
                    <FeatuesTabsContent value='Content Lake' image='/img/dashboard/lap-m.jpg' />
                </div>
            </Tabs>

        </div>
    )
}

export const Btn = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(' py-2 px-4  rounded-full', className)}>{children}</div>
    )
}
export const FeatuesTabsContent = ({ value, image }: { value: string, image: string }) => {

    return (
        <TabsContent value={value}>
            <div className='flex  flex-col  md:flex-row  w-full justify-between items-center  md:pt-5 space-y-4'>
                <div className='md:w-1/2  flex items-center'>
                    <div className='relative w-[400px] h-[300px] '>
                        <Image alt='' src={image} fill />
                    </div>
                </div>
                <div className='md:w-1/2 space-y-5 '>
                    <p className=''><span className='text-custome-orange'>Our tool allows</span> you to add your company logo, adjust colors, choose fonts, and personalize the layout to fit your unique style. You can create invoices that include all the necessary details, such as the client&apos;s contact information, itemized list of services or products, applicable taxes, payment terms, and due dates..</p>
                    <div className='flex items-center space-x-4'>
                        <Image src="/svg/list-marker.svg" alt='svg' width={25} height={25} className='invert-[2]' />
                        <p className='text-sm'>Unlike many other invoicing tools, our platform does not add watermarks,</p>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <Image src="/svg/list-marker.svg" alt='svg' width={25} height={25} className='invert-[2]' />
                        <p className='text-sm'>Unlike many other invoicing tools, our platform does not add watermarks,</p>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <Image src="/svg/list-marker.svg" alt='svg' width={25} height={25} className='invert-[2]' />
                        <p className='text-sm'>Unlike many other invoicing tools, our platform does not add watermarks,</p>
                    </div>
                    <div className='py-6'><span className='inline  px-2 py-3 border hover:bg-gray-800 cursor-pointer'>Expolore Strix Invoice</span></div>
                </div>
            </div>
        </TabsContent>
    )
}



export default Features