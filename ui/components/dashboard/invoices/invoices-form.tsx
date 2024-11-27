"use client";
import CustomInput from "@/components/reuse/invoice-input";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { getCurrentDate } from "@/lib/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Field, FieldArray, Formik, FormikProps } from "formik";
import { Printer } from "lucide-react";
import { InvoiceProductRow } from "./invoice-products-row";
import DynamicTable from "./invoice-template/dynamic-table";
import { InvoiceDetails, InvoiceFooter, InvoiceHeading } from "./invoice-template/invoice-header";
import "./invoice.css";

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
interface InvoiceTo {
    street: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    GSTIN: string;
    PAN: string;
}
interface InvoiceDetails {
    invoicePrefix: string
    invoiceNo: string;
    invoiceDate: string;
    GSTIN: string;
    PAN: string;
    HSN: string;
    stateCode: string;
}
interface InvoiceProduct {
    sku: string;
    description: string;
    price: number;
    qty: number;
    cgst: number;
    sgst: number;
    totalAmount: number;
}

export interface InvoiceConfig {
    Inoviceheading: Inoviceheading;
    invoiceFrom: InvoiceFrom;
    invoiceTo: InvoiceTo;
    invoiceDetails: InvoiceDetails;
    invoiceProducts: InvoiceProduct[];
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
    },
    invoiceTo: {
        street: "#128 GEM Road",
        street2: "MG Complex 5d ",
        city: "Manglore",
        state: "Karnataka",
        postalCode: "577002",
        phone: "+91 55477 78747",
        GSTIN: "ABCF54FD77",
        PAN: "GFFG765FFFJ"
    },
    invoiceDetails: {
        invoicePrefix: "INV/YT",
        invoiceNo: "22",
        invoiceDate: getCurrentDate(),
        GSTIN: "JDHG577G6",
        PAN: "PAFH87FG56F",
        HSN: "55",
        stateCode: "22"
    },
    invoiceProducts: [
        {
            sku: "",
            description: '',
            price: 0,
            qty: 1,
            cgst: 0,
            sgst: 0,
            totalAmount: 0
        }
    ],
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
                <Tabs defaultValue="Edit" className="md:w-full md:mx-20">
                    <div className="flex justify-between items-center">
                        <TabsList className="grid grid-cols-2 w-[25%] no-print h-12 mb-1 rounded-none">
                            <TabsTrigger value="Edit" className="h-10 rounded-none">
                                Edit
                            </TabsTrigger>
                            <TabsTrigger value="Preview" className="h-10 rounded-none">
                                Preview
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
                        <div id="invoice" className="bg-white invoice text-black px-4 md:px-28 flex-col space-y-8 py-10 border">
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
                    <TabsContent value="Edit" >
                        <InvoiceDataForm {...formik} />
                    </TabsContent>
                </Tabs>
            )}
        </Formik>
    );
}

export { InvoiceForm };

const InvoiceDataForm = (formik: FormikProps<InvoiceConfig>) => {
    // Calculate Sub Total
    const subTotal = formik.values.invoiceProducts.reduce((total, product) => {
        return total + (product.price || 0) * (product.qty || 0);
    }, 0);

    // Calculate SGST and CGST
    const sgst = formik.values.invoiceProducts.reduce((total, product) => {
        return total + ((product.sgst || 0) * (product.price || 0) * (product.qty || 0)) / 100;
    }, 0);

    const cgst = formik.values.invoiceProducts.reduce((total, product) => {
        return total + ((product.cgst || 0) * (product.price || 0) * (product.qty || 0)) / 100;
    }, 0);

    // Calculate Total
    const total = subTotal + sgst + cgst;
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col  space-y-4 pb-10 border px-10"
            autoComplete="off"
        >
            <div className="">
                <div id="invoice" className="bg-white invoice  text-black flex-col space-y-8 py-10 ">
                    <div className='flex justify-between w-full p-4  '>
                        {/* Invoice Header */}
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
                                    className="text-sm w-auto"
                                    name="Inoviceheading.subHeading"
                                    placeholder="Transport"
                                    component={CustomInput}
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 flex items-start justify-end'>
                            <div className='w-2/3'>
                                <div className='text-2xl w-full font-extrabold text-custome-textVoilate'>
                                    <Field
                                        className=" w-auto"
                                        name="Inoviceheading.title"
                                        placeholder="INVOICE"
                                        component={CustomInput}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between w-full  p-4">
                        {/* Sender Details */}
                        <div className="w-full md:w-1/2">
                            <div className="ml-2 font-bold text-sm">FROM</div>
                            {/* Invoice From */}
                            <div className="font-sans">
                                <Field
                                    className="text-sm w-auto" name="invoiceFrom.street" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <Field
                                    className="text-sm w-auto" name="invoiceFrom.street2" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <div className="flex gap-1">
                                    <Field
                                        className="text-sm w-1/2" name="invoiceFrom.city" placeholder="INVOICE"
                                        component={CustomInput}
                                    />
                                    <Field
                                        className="text-sm w-1/2" name="invoiceFrom.state" placeholder="INVOICE"
                                        component={CustomInput}
                                    />
                                </div>
                                <Field
                                    className="text-sm w-auto" name="invoiceFrom.postalCode" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <Field
                                    className="text-sm w-auto" name="invoiceFrom.phone" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                            </div>
                            {/* Invoice To */}
                            <div className="ml-2 mt-7 font-bold text-sm">TO</div>
                            <div className="font-sans ">
                                <Field
                                    className="text-sm w-auto" name="invoiceTo.street" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <Field
                                    className="text-sm w-auto" name="invoiceTo.street2" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <div className="flex gap-1">
                                    <Field
                                        className="text-sm w-1/2" name="invoiceTo.city" placeholder="INVOICE"
                                        component={CustomInput}
                                    />
                                    <Field
                                        className="text-sm w-1/2" name="invoiceTo.state" placeholder="INVOICE"
                                        component={CustomInput}
                                    />
                                </div>
                                <Field
                                    className="text-sm w-auto" name="invoiceTo.postalCode" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <Field
                                    className="text-sm w-auto" name="invoiceTo.phone" placeholder="INVOICE"
                                    component={CustomInput}
                                />
                                <Field
                                    className="text-sm w-auto" name="invoiceTo.GSTIN" placeholder="FASD76FSAF6"
                                    component={CustomInput}
                                />
                                <Field
                                    className="text-sm w-auto" name="invoiceTo.PAN" placeholder="BHJ766FASD"
                                    component={CustomInput}
                                />
                            </div>
                        </div>
                        {/* Invoice Details */}
                        <div className="w-full md:w-1/2 flex items-start justify-end font-sans">
                            <div className="max-w-[70%]">

                                <div className="flex items-center gap-1">
                                    <div className="text-sm w-[40%] font-bold">InoviceNo</div>
                                    <div className="flex w-[60%]">
                                        <Field
                                            className="text-sm " name="invoiceDetails.invoicePrefix" placeholder="INX"
                                            component={CustomInput}
                                        />
                                        <Field
                                            className="text-sm w-auto" name="invoiceDetails.invoiceNo" placeholder="INVOICE"
                                            component={CustomInput}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="text-sm w-[40%] font-bold">InvoiceDate</div>
                                    <div className="flex w-[60%]">
                                        <Field
                                            className="text-sm " name="invoiceDetails.invoicePrefix" placeholder="INX"
                                            component={CustomInput}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="text-sm w-[40%] font-bold">GSTIN</div>
                                    <div className="flex w-[60%]">
                                        <Field
                                            className="text-sm " name="invoiceDetails.GSTIN" placeholder="INX"
                                            component={CustomInput}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="text-sm w-[40%] font-bold">PAN</div>
                                    <div className="flex w-[60%]">
                                        <Field
                                            className="text-sm " name="invoiceDetails.PAN" placeholder="INX"
                                            component={CustomInput}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="text-sm w-[40%] font-bold">HSN</div>
                                    <div className="flex w-[60%]">
                                        <Field
                                            className="text-sm " name="invoiceDetails.HSN" placeholder="44"
                                            component={CustomInput}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="text-sm w-[40%] font-bold">State Code</div>
                                    <div className="flex w-[60%]">
                                        <Field
                                            className="text-sm " name="invoiceDetails.stateCode" placeholder="22"
                                            component={CustomInput}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
                {/* Invoice Products  */}
                <div>
                    <div className="font-bold text-sm px-4">
                        <FieldArray name="invoiceProducts">
                            {({ remove, push }) => (
                                <div>
                                    {/* Table Header */}
                                    <table className="table-auto w-full  ">
                                        <thead className="text-left text-sm bg-gray-100 py-10">
                                            <tr>
                                                <th className="w-1/12  text-sm px-2 py-2 ">No</th> {/* ~16% */}
                                                <th className="w-2/5  px-2 ">Description</th> {/* ~40% */}
                                                <th className="w-1/6  px-2">Price</th> {/* ~16% */}
                                                <th className="w-1/12  px-2">QTY</th> {/* Small width */}
                                                <th className="w-1/12  px-2">CGST</th> {/* Small width */}
                                                <th className="w-1/12  px-2">SGST</th> {/* Small width */}
                                                <th className="w-1/6  px-2 text-center">Total</th> {/* ~16% */}
                                                <th className="w-fit bg-white text-center"></th> {/* Fit for icon */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Render invoice product rows dynamically */}
                                            {formik.values.invoiceProducts.map((_, idx) => (
                                                <InvoiceProductRow
                                                    key={idx}
                                                    idx={idx}
                                                    handleChange={formik.handleChange}
                                                    values={formik.values}
                                                    removeRow={remove}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* Add Row Button */}
                                    <div className="my-2 flex justify-between">
                                        <div
                                            onClick={() => push({ sku: "", description: "", qty: 1, cgst: 0, sgst: 0, totalAmount: 0 })}
                                            className="w-1/12 h-8 flex items-center border p-1 cursor-pointer transition-transform transform hover:scale-110 focus:outline-none"
                                        >
                                            <PlusCircledIcon className="pr-1" /> Add
                                        </div>
                                        <div>
                                            <table className="mr-7 mt-5">
                                                <tbody>
                                                    <tr className="">
                                                        <td className="font-semibold border-r px-2">Sub Total</td>
                                                        <td className="text-right px-2">{Math.ceil(subTotal).toFixed(2)}</td>
                                                    </tr>
                                                    <tr className="total border-b ">
                                                        <td className="font-semibold border-r px-2">SGST</td>
                                                        <td className="text-right px-2">{sgst}</td>
                                                    </tr>
                                                    <tr className="total border-b ">
                                                        <td className="font-semibold border-r px-2">CGST</td>
                                                        <td className="text-right px-2">{cgst}</td>
                                                    </tr>
                                                    <tr className="">
                                                        <td className="font-semibold border-r px-2">Total</td>
                                                        <td className="text-right px-2">{Math.ceil(total).toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                </div>
                <div className="px-4"><Button type="submit" className="w-1/3 rounded-none">Save</Button></div>
            </div>
        </form>
    )
}

