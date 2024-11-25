"use client"
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Image from 'next/image'
import { useState } from 'react'

function Features() {
    const [currentFeature, setcurrentFeature] = useState<string>("studio")

    function changeFeature(name: string) {
        setcurrentFeature(name);
    }
    return (
        <div className='flex flex-col items-center w-full mx-2 md:w-[80vw] md:mx-auto space-y-2   text-white h-full '>
            <div className='md:mt-4 mx-2'>
                <p className='text-center text-lg md:text-3xl font-medium'>Comprehensive solutions for all your invoicing needs, effortlessly covered</p>
                <p className='py-2 text-center text-xs md:text-sm text-muted'>Create polished, professional quotes for your clients that can quickly be turned into invoices—faster than you can say, Let&apos;s go!</p>
            </div>
            <Tabs defaultValue="studio" className="flex-col items-center justify-items-center space-y-5 w-full ">
                <TabsList className='flex  bg-[#1b1d20] rounded-none font-bold text-sm'>
                    <Btn className={cn(currentFeature === "studio" && "bg-custome-orange", currentFeature !== "studio" && "hover:bg-gray-800")}><TabsTrigger value="studio" onClick={() => changeFeature("studio")} >Studio</TabsTrigger></Btn>
                    <Btn className={cn(currentFeature === "api" && "bg-custome-orange", currentFeature !== "api" && "hover:bg-gray-800")}><TabsTrigger value="api" onClick={() => changeFeature("api")} >Api</TabsTrigger></Btn>
                    <Btn className={cn(currentFeature === "contentLake" && "bg-custome-orange", currentFeature !== "contentLake" && "hover:bg-gray-800")}><TabsTrigger value="contentLake" onClick={() => changeFeature("contentLake")} >Content Lake</TabsTrigger></Btn>
                </TabsList>
                <div className='w-full'>
                    {/* <h3 className='text-2xl font-bold text-center my-4'>Professional-Looking Invoices</h3> */}
                    <FeatuesTabsContent value="studio" />
                    <FeatuesTabsContent value="api" />
                    <FeatuesTabsContent value="contentLake" />
                </div>
            </Tabs>
        </div>
    )
}

export const Btn = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(' py-2 px-4  rounded-none', className)}>{children}</div>
    )
}
// Define content for different tabs
const tabContents = {
    studio: {
        image: '/img/ftr-1-nbg.png',
        description: 'Our tool allows you to add your company logo, adjust colors, choose fonts, and personalize the layout to fit your unique style. You can create invoices that include all the necessary details, such as the client\'s contact information, itemized list of services or products, applicable taxes, payment terms, and due dates.',
        features: [
            'Unlike many other invoicing tools, our platform does not add watermarks.',
            'Create professional invoices with ease.',
            'Fully customizable templates for your business needs.',
        ],
    },
    api: {
        image: '/img/ftr-nbg-api.png',
        description: 'Easily integrate our API to streamline your invoicing process and ensure seamless data synchronization across platforms.',
        features: [
            'Developer-friendly API documentation.',
            'Secure and reliable data processing.',
            'Real-time synchronization with your systems.',
        ],
    },
    contentLake: {
        image: '/img/ftr-3-nbg.png',
        description: 'Manage and store your invoice data efficiently with our robust Content Lake, designed for high-performance and scalability.',
        features: [
            'Efficient data storage solutions.',
            'Easily searchable and filterable content.',
            'Built for scalability and reliability.',
        ],
    },
};

// Reusable component
export const FeatuesTabsContent = ({ value }: { value: keyof typeof tabContents }) => {
    const { image, description, features } = tabContents[value];

    return (
        <TabsContent value={value}>
            <div className="flex flex-col md:flex-row w-full justify-between items-center md:pt-5 space-y-10">
                <div className="md:w-1/2 flex items-center  justify-center">
                    <div className="relative w-[80vw] h-[250px] md:w-[400px] md:h-[300px] ">
                        <Image alt={`${value} image`} src={image} fill priority className='shadow-inner'/>
                    </div>
                </div>
                <div className="md:w-1/2 space-y-5">
                    <p>
                        <span className="text-custome-orange">Our tool allows</span> {description}
                    </p>
                    {features.map((feature, index) => (
                        <div className="flex items-center space-x-4" key={index}>
                            <Image
                                src="/svg/list-marker.svg"
                                alt="svg"
                                width={25}
                                height={25}
                                className="invert-[2]"
                            />
                            <p className="text-sm">{feature}</p>
                        </div>
                    ))}
                    <div className="py-6">
                        <span className="inline px-2 py-3 border hover:bg-gray-800 cursor-pointer">
                            Explore Strix Invoice
                        </span>
                    </div>
                </div>
            </div>
        </TabsContent>
    );
};

// export const FeatuesTabsContent = ({ value, image }: { value: string, image: string }) => {
//     return (
//         <TabsContent value={value}>
//             <div className='flex  flex-col  md:flex-row  w-full justify-between items-center  md:pt-5 space-y-6'>
//                 <div className='md:w-1/2  flex items-center'>
//                     <div className='relative w-[80vw] h-[250px] md:w-[400px] md:h-[300px] '>
//                         <Image alt='' src={image} fill />
//                     </div>
//                 </div>
//                 <div className='md:w-1/2 space-y-5 '>
//                     <p className=''><span className='text-custome-orange'>Our tool allows</span> you to add your company logo, adjust colors, choose fonts, and personalize the layout to fit your unique style. You can create invoices that include all the necessary details, such as the client&apos;s contact information, itemized list of services or products, applicable taxes, payment terms, and due dates..</p>
//                     <div className='flex items-center space-x-4'>
//                         <Image src="/svg/list-marker.svg" alt='svg' width={25} height={25} className='invert-[2]' />
//                         <p className='text-sm'>Unlike many other invoicing tools, our platform does not add watermarks,</p>
//                     </div>
//                     <div className='flex items-center space-x-4'>
//                         <Image src="/svg/list-marker.svg" alt='svg' width={25} height={25} className='invert-[2]' />
//                         <p className='text-sm'>Unlike many other invoicing tools, our platform does not add watermarks,</p>
//                     </div>
//                     <div className='flex items-center space-x-4'>
//                         <Image src="/svg/list-marker.svg" alt='svg' width={25} height={25} className='invert-[2]' />
//                         <p className='text-sm'>Unlike many other invoicing tools, our platform does not add watermarks,</p>
//                     </div>
//                     <div className='py-6'><span className='inline  px-2 py-3 border hover:bg-gray-800 cursor-pointer'>Expolore Strix Invoice</span></div>
//                 </div>
//             </div>
//         </TabsContent>
//     )
// }



export default Features