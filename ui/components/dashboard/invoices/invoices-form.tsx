/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { RootState } from "@/store/store";
import { Formik, FormikProps } from "formik";
import { Printer } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { hasConfigChanged, InvoiceSchema } from "./form-validation-schema";
import { InvoiceDataForm } from "./invoice-template/form-components/InvoiceDataForm";
import "./invoice.css";
import { InvoicePage } from "./InvoicePage";
import { InvoiceConfig, InvoiceFormData } from "./types";
import { createInvoiceConfig, updateInvoiceConfig } from "@/api/invoiceConfig";


function InvoiceForm({ initialValues }: { initialValues: InvoiceFormData, }) {
    const [printTitle, setprintTitle] = useState((initialValues.invoiceDetails.invoicePrefix + initialValues.invoiceDetails.invoiceNo))
    const previouesConfig = useSelector((state: RootState) => state.config.invoiceConfig);
    const activeBusinessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = printTitle;
        window.print();
        window.onafterprint = () => {
            document.title = originalTitle;
        };
        document.title = originalTitle;
    };
    const handleSubmit = async (values: InvoiceFormData) => {
        const currentConfig: InvoiceConfig = {
            invoiceHeading: values.invoiceHeading,
            invoiceFrom: values.invoiceFrom,
            invoiceDetails: values.invoiceDetails,
            additionlInfo: values.additionlInfo,
            bankDetails: values.bankDetails,
        };
        if (previouesConfig && hasConfigChanged(currentConfig, previouesConfig)) {
            try {
                if (previouesConfig.invoiceDetails.invoiceNo === "1") {
                    console.log("create Invoice Config and Invoice")
                    await createInvoiceConfig(activeBusinessId, currentConfig);
                } else {
                    console.log("Update Invoice Config");
                    await updateInvoiceConfig(activeBusinessId, {
                        ...currentConfig,
                        invoiceDetails: {
                            ...currentConfig.invoiceDetails,
                            invoiceNo: previouesConfig.invoiceDetails.invoiceNo
                        }
                    });
                }
                // if Config Prefix Changed check if Pref already exists and update max value else set to 1
                // Note If Config Not Changed
                // if CurrentinvNo < prevNoCheck For inv No Availability if Yes Create invoice Dont Update Config Val to Next
                if (currentConfig.invoiceDetails.invoiceNo < previouesConfig.invoiceDetails.invoiceNo) {
                    // check for Inv No avaliablity if yes proceed
                } else {
                    // if currentInvNo > preInvNo Create Inv and Update Config with Next value ++
                    
                }
                // create Invoice will Receive next available Id with Created Details update next Id in Redux
            } catch (error) {
                console.log("Alert Error While Creating InvoiceConfig")
            }
        }
    }

    return (
        <Formik
            initialValues={{ ...initialValues }}
            // validationSchema={InvoiceSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {(formik: FormikProps<typeof initialValues>) => (
                <Tabs defaultValue="Edit" className="md:w-full md:px-10 lg:px-36">
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
                                    className="rounded-none shadow-sm border p-2">
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

