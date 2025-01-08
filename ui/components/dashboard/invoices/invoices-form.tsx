/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createInvoices, updateInvoices } from "@/api/invoices";
import { setConfigData } from "@/store/slices/configSlice";
import { removeInvoice, unShiftInvoice } from "@/store/slices/invoicesSlice";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { AxiosError } from "axios";
import { Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'sonner';
import { InvoiceConfig, InvoiceFormData } from "./form-data";
import { InvoiceDataForm } from "./invoice-form-components/InvoiceDataForm";
import "./invoice.css";
import { Invoice } from "./types";
import { InvoiceSchema } from "./form-validation-schema";



function InvoiceForm({ initialValues, type, id }: { initialValues: InvoiceFormData, type: "CREATE" | "UPDATE", id?: string }) {
    const activeBusinessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const config = useSelector((state: RootState) => state.config.invoiceConfig);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState<string | null>(null);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (values: InvoiceFormData) => {
        setIsSubmitting(true);
        try {
            let response: ApiResponse<Invoice>;
            if (type === "UPDATE") {
                if (id) {
                    response = await updateInvoices(activeBusinessId, values, id);
                } else {
                    throw new Error("Invoice ID is required for update");
                }
            } else {
                response = await createInvoices(activeBusinessId, values);
            }
            if (response.result) {
                const InvoiceData: Invoice = response.result;
                const invoiceNo = `${InvoiceData.invoiceDetails.invoicePrefix}${InvoiceData.invoiceDetails.invoiceNo}`
                if (type === "UPDATE" && id) dispatch(removeInvoice(id));
                dispatch(unShiftInvoice({
                    _id: InvoiceData._id || "",
                    invoiceDetails: {
                        ...InvoiceData.invoiceDetails,
                        invoiceNo: (InvoiceData.invoiceDetails.invoiceNo).toString()
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
                        invoiceNo: (InvoiceData.invoiceDetails.invoiceNo + 1).toString(), // TODO: fix this update Max Invoice No
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
                toast.success(`Invoice ${invoiceNo} ${type === "UPDATE" ? "updated" : "created"} successfully`);
                router.push(`/dashboard/invoices/view/${InvoiceData._id}?type=${type}`);
            } else {
                setIsError(`Failed to ${type === "UPDATE" ? "update" : "create"} invoice`);
                toast.error(`Failed to ${type === "UPDATE" ? "update" : "create"} invoice`);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setIsError(error.response?.data.message);
            } else {
                setIsError(`Failed to ${type === "UPDATE" ? "update" : "create"} invoice`);
            }
            toast.error(`Failed to ${type === "UPDATE" ? "update" : "create"} invoice`);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={InvoiceSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {(formik: FormikProps<typeof initialValues>) => (
                <div className="md:w-full md:px-10 lg:px-36">
                    <InvoiceDataForm status={type} formik={formik} isError={isError} isSubmitting={isSubmitting} />
                </div>
            )}
        </Formik>
    );
}

export { InvoiceForm };

