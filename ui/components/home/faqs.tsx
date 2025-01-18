import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function FAQ() {
    return (
        <div className='md:flex gap-10 space-y-6 w-full'>
            <div className='md:w-1/3 space-y-3 mt-6'>
                <div className='font-medium text-red-400'>GOT QUESTIONS?</div>
                <div className='text-4xl font-bold'>Frequently Asked Questions</div>
                <div className='text-sm text-gray-500'> If you have any forther Questions Please don&apos;t hesitate to reach out to our customers support team for assistance</div>
            </div>
            <div className='md:w-2/3'>
                <AccordionFAQ />
            </div>
        </div>
    )
}

export default FAQ

const faqItems = [
    {
        value: "item-1",
        question: "How do I generate an invoice?",
        answer: "You can generate an invoice by navigating to the 'Create Invoice' section, filling in the required details, and clicking 'Generate'.",
    },
    {
        value: "item-2",
        question: "Can I customize my invoice template?",
        answer: "Yes, you can customize your invoice template under the 'Settings' section to match your branding needs.",
    },
    {
        value: "item-3",
        question: "Is there support for multiple currencies?",
        answer: "Yes, our invoicing software supports multiple currencies to cater to global businesses.",
    },
    {
        value: "item-4",
        question: "How do I track paid and unpaid invoices?",
        answer: "You can track your invoices in the 'Invoice Dashboard', which shows the status of all paid and unpaid invoices in real-time.",
    },
];

export function AccordionFAQ() {
    return (
        <Accordion type="single" collapsible className="w-full space-y-2">
            {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value} className='border px-4 rounded-none'>
                    <AccordionTrigger className='hover:no-underline'>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}