/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Formik, FormikProps } from "formik";
import { Printer } from "lucide-react";
import { useState } from "react";
import "./invoice.css";
import { InvoicePage } from "./InvoicePage";
import { InvoiceFormData } from "./types";
import { InvoiceDataForm } from "./invoice-template/form-components/InvoiceDataForm";



function InvoiceForm({ initialValues }: { initialValues: InvoiceFormData, }) {
    const [printTitle, setprintTitle] = useState((initialValues.invoiceDetails.invoicePrefix + initialValues.invoiceDetails.invoiceNo))
    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = printTitle;
        window.print();
        window.onafterprint = () => {
            document.title = originalTitle;
        };
        document.title = originalTitle;
    };
    return (
        <Formik
            initialValues={{ ...initialValues }}
            onSubmit={(values) => {
                console.log("Submited Invoice Value", values);
            }}
        >
            {(formik: FormikProps<typeof initialValues>) => (
                <Tabs defaultValue="Edit" className="md:w-full md:px-40">
                    <div className="flex justify-between items-center">
                        <TabsList className="grid grid-cols-2 md:w-[25%] no-print h-12 mb-1 rounded-none">
                            <TabsTrigger value="Edit" className="h-10 rounded-none">
                                Edit
                            </TabsTrigger>
                            <TabsTrigger value="Preview" className="h-10 rounded-none">
                                Preview
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex no-print">
                            <TabsContent value="Preview">
                                <button onClick={() => {
                                    handlePrint();
                                    setprintTitle((formik.values.invoiceDetails.invoicePrefix + formik.values.invoiceDetails.invoiceNo))
                                }}
                                    className="rounded-none border p-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <Printer />
                                        Print Invoice
                                    </div>
                                </button>
                            </TabsContent>
                        </div>
                    </div>
                    <InvoicePage formik={formik} />
                    <TabsContent value="Edit" >
                        <InvoiceDataForm {...formik} />
                    </TabsContent>
                </Tabs>
            )}
        </Formik>
    );
}

export { InvoiceForm };

