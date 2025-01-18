import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

type CardProps = {
    step: string;
    title: string;
    description: string;
    imageSrc: string;
    className?: string;
};

const StepCard: React.FC<CardProps> = ({ step, title, description, imageSrc, className }) => (
    <Card className={cn("shadow-sm rounded-md ",className)}>
        <CardHeader className="img flex items-center mt-8">
            <div className="relative w-[250px] h-[180px] rounded-sm shadow-md">
                <Image src={imageSrc} alt={title} fill className="rounded-sm" />
            </div>
        </CardHeader>
        <CardContent className="flex gap-2 items-center">
            <p className="px-2 py-1 bg-blue-200 border rounded-full text-sm shadow-inner">{step}</p>
            <p className="text-2xl font-bold">{title}</p>
        </CardContent>
        <CardFooter>
            <p className="text-sm text-gray-600">{description}</p>
        </CardFooter>
    </Card>
);

function GetStarted() {
    return (
        <div className="flex-col items-center justify-center">
            <div className="flex items-center justify-center uppercase">
                <Button variant="outline" className="rounded-none  border-red-500 ">
                    How it Works
                </Button>
            </div>
            <div className="text-center font-bold text-2xl py-4">Get Started in 3 steps</div>
            <div className="grid auto-rows-min gap-8 md:grid-cols-3 mx-4 my-5">
                <StepCard
                    step="01"
                    title="SignUp & Customize"
                    description="Create your account in minutes and tailor the platform to fit your unique business needs with our easy-to-use customization tools."
                    imageSrc="/img/GS-1.jpg"
                    className='md:mt-12'
                />
                <StepCard
                    step="02"
                    title="Integrate and Automate"
                    description="Seamlessly integrate with your existing tools and automate workflows to save time and increase efficiency."
                    imageSrc="/img/automate.jpg"
                    className='md:mb-12'
                />
                <StepCard
                    step="03"
                    title="Monitor and Optimize"
                    description="Track performance with powerful analytics and optimize processes for continuous improvement."
                    imageSrc="/img/monitor.jpg"
                    className='md:mt-12'
                />
            </div>
        </div>
    );
}

export default GetStarted