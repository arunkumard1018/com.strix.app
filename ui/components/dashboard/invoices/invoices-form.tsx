"use client";
import CustomInput from "@/components/reuse/invoice-input";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Field, Formik, FormikProps } from "formik";
import { Printer } from "lucide-react";
import DynamicTable from "./invoice-template/dynamic-table";
import { InvoiceDetails, InvoiceFooter, InvoiceHeading } from "./invoice-template/invoice-header";
import { Button } from "@/components/ui/button";

interface Inoviceheading {
    heading: string;
    subHeading: string;
    title: string;
}
interface InvoiceFrom {
    street: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
}
interface InvoiceConfig {
    Inoviceheading: Inoviceheading;
    invoiceFrom: InvoiceFrom;
}
const initialValues: InvoiceConfig = {
    Inoviceheading: {
        heading: "Strix Invoice",
        subHeading: "Transport",
        title: "TAX INVOICE"
    },
    invoiceFrom: {
        street: "#128 Church Hill Street",
        street2: "near IMAX 5d ",
        city: "Banglore",
        state: "Karnataka",
        postalCode: "577002",
        phone: "+91 87255 26533"
    }
};

function InvoiceForm() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {(formik: FormikProps<typeof initialValues>) => (
                <Tabs defaultValue="Preview" className="md:w-full md:mx-40">
                    <div className="flex justify-between items-center">
                        <TabsList className="grid grid-cols-2 w-[25%] no-print h-12 mb-1 rounded-none">
                            <TabsTrigger value="Preview" className="h-10 rounded-none">
                                Preview
                            </TabsTrigger>
                            <TabsTrigger value="Edit" className="h-10 rounded-none">
                                Edit
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex no-print">
                            <TabsContent value="Preview">
                                <button onClick={handlePrint} className="rounded-none border p-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <Printer />
                                        Print Invoice
                                    </div>
                                </button>
                            </TabsContent>
                        </div>
                    </div>
                    <TabsContent value="Preview">
                        <div id="invoice" className="bg-white invoice text-black px-4 md:px-32 flex-col space-y-8 py-10 border">
                            <InvoiceHeading
                                businessName={formik.values.Inoviceheading.heading}
                                buisnessType={formik.values.Inoviceheading.subHeading}
                                invoiceTitle={formik.values.Inoviceheading.title}
                            />
                            <InvoiceDetails />
                            <div className="flex justify-between w-full">
                                <DynamicTable />
                            </div>
                            <InvoiceFooter />
                            <div>
                                <div className="flex no-print">
                                    <button onClick={handlePrint} className="rounded-none border p-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <Printer />
                                            Print Invoice
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Edit">
                        <InvoiceDataForm {...formik} />
                    </TabsContent>
                </Tabs>
            )}
        </Formik>
    );
}

export { InvoiceForm };

const InvoiceDataForm = (formik: FormikProps<InvoiceConfig>) => {
    return (
        <div id="invoice" className="bg-white invoice h-screen text-black px-4 md:px-20 flex-col space-y-8 py-10 border">
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col items-center space-y-4 pb-10"
                autoComplete="off"
            >
                <div className='flex justify-between w-full p-4 border '>
                    <div className='w-full md:w-1/2 '>
                        <div className='text-2xl w-full md:text-4xl font-medium text-custome-textBlue'>
                            <Field
                                className="w-auto border-none outline-none"
                                name="Inoviceheading.heading"
                                placeholder="Strix Invoice"
                                component={CustomInput}
                            />
                        </div>
                        <div className='text-sm text-gray-600 italic'>
                            <Field
                                className="w-auto"
                                name="Inoviceheading.subHeading"
                                placeholder="Transport"
                                component={CustomInput}
                            />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 flex items-start justify-end'>
                        <div className='w-1/2'>
                            <div className='text-2xl w-full font-extrabold text-custome-textVoilate'>
                                <Field
                                    className="w-auto"
                                    name="Inoviceheading.title"
                                    placeholder="INVOICE"
                                    component={CustomInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full border p-4">
                    {/* Sender Details */}
                    <div className="w-full md:w-1/2">
                        <div className="font-sans">
                            <Field
                                className="w-auto" name="invoiceFrom.street" placeholder="INVOICE"
                                component={CustomInput}
                            />
                            <Field
                                className="w-auto" name="invoiceFrom.street2" placeholder="INVOICE"
                                component={CustomInput}
                            />
                            <div className="flex gap-1">
                                <Field
                                    className="w-auto" name="invoiceFrom.city" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <Field
                                    className="w-auto" name="invoiceFrom.state" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                            </div>
                            <Field
                                className="w-auto" name="invoiceFrom.postalCode" placeholder="INVOICE"
                                component={CustomInput}
                            />
                            <Field
                                className="w-auto" name="invoiceFrom.phone" placeholder="INVOICE"
                                component={CustomInput}
                            />
                        </div>
                        <div className="mt-7 font-sans">
                            <div className="font-serif text-custome-textBlue">TO:</div>
                            <p>#5678 Moonlight Street</p>
                            <p>Hill View Post</p>
                            <p>Mysore, Karnataka, 570001</p>
                            <p>Phone: +91 9876543211</p>
                            <p>GSTIN: 29ABCDE1234FZ1</p>
                        </div>
                    </div>
                    {/* Invoice Details */}
                    <div className="w-full md:w-1/2 flex items-start justify-end font-sans">
                        <div className="max-w-[70%]">
                            <p>INVOICE NO: INV/2023/001</p>
                            <p>Date: 01-11-2024</p>
                            <p>GSTIN: 29XYZ9876PL0</p>
                            <p>PAN: ABCDE1234F</p>
                            <p>HSN: 1234</p>
                            <p>State Code: 29</p>
                            <p>State: Karnataka</p>
                        </div>
                    </div>
                </div>
                <Button type="submit">Save password</Button>
            </form>
        </div>
    )
}

