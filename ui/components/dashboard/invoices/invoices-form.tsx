"use client";
import { DatePicker } from "@/components/reuse/DateSelector";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { RootState } from "@/store/store";
import { Formik, FormikProps } from "formik";
import { Printer } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BankDetailsForm from "./invoice-template/form-components/BankDetails";
import { ProductsFieldArray, TransportProductFieldArray } from "./invoice-template/form-components/field-arrays";
import { InvoiceDetailsForm } from "./invoice-template/form-components/InvoiceDetailsForm";
import InvoiceHeaderForm from "./invoice-template/form-components/InvoiceHeaderForm";
import InvoiceSecondaryHeaderForm from "./invoice-template/form-components/InvoiceSecondaryHeaderForm";
import { InvoiceFooter, InvoiceHeading, InvoiceInfo } from "./invoice-template/invoice-header";
import InvoiceProductsTable from "./invoice-template/invoiceProductsTable";
import { InvoiceProductsTableTransport } from "./invoice-template/InvoiceProductsTableTransport";
import "./invoice.css";
import { InvoiceFormData } from "./types";
import { InvoicePage } from "./InvoicePage";



function InvoiceForm({ initialValues }: { initialValues: InvoiceFormData }) {

    const [printTitle, setprintTitle] = useState((initialValues.invoiceDetails.invoicePrefix + initialValues.invoiceDetails.invoiceNo))
    const globalState = useSelector((state: RootState) => state);
    const activeBusiness = globalState.authContext.activeBusiness;
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

const InvoiceDataForm = (formik: FormikProps<InvoiceFormData>) => {
    const globalState = useSelector((state: RootState) => state);
    const activeBusiness = globalState.authContext.activeBusiness;
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col  space-y-4 pb-10 border md:px-10"
            autoComplete="off"
        >
            <div className="">
                <div id="invoice" className=" invoice   flex-col space-y-8 py-10 ">
                    {/* Invoice Header Form  */}
                    <InvoiceHeaderForm handleChange={formik.handleChange} />
                    {/* Invoice Secondary Header */}
                    {/* Invoice Details */}
                    <div className="md:flex md:flex-row-reverse space-y-5  w-full p-4">
                        <div className="w-full md:w-1/2 flex items-start justify-end font-sans">
                            <div className="md:max-w-[70%]">
                                <div className="flex items-center space-y-1">
                                    <div className="text-sm w-[40%] font-bold">InvoiceDate</div>
                                    <div className="flex w-[60%]">
                                        <DatePicker
                                            value={new Date(formik.values.invoiceDetails.invoiceDate)}
                                            onChange={(date) => formik.setFieldValue('invoiceDetails.invoiceDate', date)}
                                        />
                                    </div>
                                </div>
                                <InvoiceDetailsForm handleChange={formik.handleChange} />
                            </div>
                        </div>
                        {/* Sender Details Includes FROM and TO */}
                        <InvoiceSecondaryHeaderForm handleChange={formik.handleChange} />
                    </div>
                </div >
                {/* Invoice Products  */}
                <div>
                    <div className="font-bold text-sm px-4">
                        {activeBusiness.catagory === "Transport" ?
                            <TransportProductFieldArray formik={formik} />
                            : <ProductsFieldArray formik={formik} />}
                    </div>
                </div>
                <div className="px-4 my-10">
                    <BankDetailsForm handleChange={formik.handleChange} isBankDetails={formik.values.additionlInfo.isBankDetails} />
                </div>
                <div className="px-4"><Button type="submit" className="w-1/3 rounded-none">Save</Button></div>
            </div>
        </form>
    )
}