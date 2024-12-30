/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createInvoices } from "@/api/invoices";
import { setConfigData } from "@/store/slices/configSlice";
import { unShiftInvoice } from "@/store/slices/invoicesSlice";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceConfig, InvoiceFormData } from "./form-data";
import { InvoiceDataForm } from "./invoice-form-components/InvoiceDataForm";
import "./invoice.css";
import { Invoice } from "./types";
import { toast } from 'sonner';



function InvoiceForm({ initialValues }: { initialValues: InvoiceFormData, }) {
    const activeBusinessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: InvoiceFormData) => {
        setIsSubmitting(true);
        try {
            const response: ApiResponse<Invoice> = await createInvoices(activeBusinessId, values);
            if (response.result) {
                const InvoiceData: Invoice = response.result;
                dispatch(unShiftInvoice({
                    _id: InvoiceData._id || "",
                    invoiceDetails: {
                        ...InvoiceData.invoiceDetails,
                        invoiceNo: InvoiceData.invoiceDetails.invoiceNo.toString()
                    },
                    invoiceFrom: InvoiceData.invoiceFrom,
                    invoiceTo: InvoiceData.invoiceTo,
                    additionalInfo: InvoiceData.additionalInfo,
                    invoiceSummary: InvoiceData.invoiceSummary,
                }));
                const configData: InvoiceConfig = {
                    invoiceHeading: InvoiceData.invoiceHeading,
                    invoiceFrom: {
                        ...InvoiceData.invoiceFrom,
                        postalCode: InvoiceData.invoiceFrom.postalCode.toString(),
                        phone: InvoiceData.invoiceFrom.phone?.toString(),
                    },
                    invoiceDetails: {
                        ...InvoiceData.invoiceDetails,
                        invoiceNo: (InvoiceData.invoiceDetails.invoiceNo + 1).toString(),
                        HSN: InvoiceData.invoiceDetails.HSN?.toString(),
                        stateCode: InvoiceData.invoiceDetails.stateCode?.toString(),
                    },
                    bankDetails: {
                        ...InvoiceData.bankDetails,
                        accountNumber: InvoiceData.bankDetails.accountNumber?.toString(),
                    },
                    additionalInfo: InvoiceData.additionalInfo,
                };
                dispatch(setConfigData(configData));
                toast.success('Invoice created successfully');
                router.push(`/dashboard/invoices/view/${InvoiceData._id}`);
            } else {
                setIsError(true);
                toast.error('Failed to create invoice');
            }
        } catch (error) {
            setIsError(true);
            toast.error('Error creating invoice');
            console.log("Alert Error While Creating Invoice", error)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Formik
            initialValues={{ ...initialValues }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {(formik: FormikProps<typeof initialValues>) => (
                <div className="md:w-full md:px-10 lg:px-36">
                    <InvoiceDataForm formik={formik} isError={isError} isSubmitting={isSubmitting} />
                </div>
            )}
        </Formik>
    );
}

export { InvoiceForm };

