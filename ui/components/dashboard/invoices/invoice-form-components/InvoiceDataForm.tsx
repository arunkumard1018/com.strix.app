/* eslint-disable @typescript-eslint/no-unused-vars */
import { getInvoiceConfig } from "@/api/invoiceConfig";
import InvoiceSkeleton from "@/components/skeltons/invoice-skelton";
import { Button } from "@/components/ui/button";
import { invoiceConfig } from "@/config/invoice";
import { setInvoiceConfigWithId } from "@/store/slices/configSlice";
import { RootState } from "@/store/store";
import { Form, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceFormData } from "../form-data";
import BankDetailsForm from "./BankDetails";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import InvoiceHeaderForm from "./InvoiceHeaderForm";
import InvoiceSecondaryHeaderForm from "./InvoiceSecondaryHeaderForm";
import { ProductsFieldArray, TransportProductFieldArray } from "./field-arrays";
import { Loader2 } from "lucide-react";

interface InvoiceDataFormProps {    
    formik: FormikProps<InvoiceFormData>;
    isError: boolean;
    isSubmitting: boolean;
}
const InvoiceDataForm = ({ formik ,isError, isSubmitting}: InvoiceDataFormProps) => {
    const activeBusiness = useSelector((state: RootState) => state.authContext.activeBusiness);
    const config = useSelector((state: RootState) => state.config);
    const storedInvoiceConfig = config.invoiceConfig;
    const dispatch = useDispatch();
    const storedConfigBusinessId = config.businessId;
    const [status, setStatus] = useState("CREATE")
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadData = async () => {
            if (status !== "CREATE") return;
            setLoading(true)
            try {
                const response = await getInvoiceConfig(activeBusiness._id);
                console.log(response.result)
                if (response.result) {
                    formik.setValues({
                        ...formik.values, ...response.result,
                        invoiceFrom: {
                            ...response.result.invoiceFrom,
                            postalCode: String(response.result.invoiceFrom.postalCode),
                            phone: String(response.result.invoiceFrom.phone),
                        },
                        invoiceDetails: {
                            ...response.result.invoiceDetails,
                            invoiceNo: String(response.result.invoiceDetails.invoiceNo),
                            HSN: String(response.result.invoiceDetails.HSN),
                            stateCode: String(response.result.invoiceDetails.stateCode),
                            invoiceDate: new Date(),
                            dueDate: new Date(),
                        },
                        additionalInfo: {
                            ...response.result.additionalInfo,
                            paymentMethod: "Cash",
                            paymentStatus: "Processing",
                        }
                    })
                    dispatch(setInvoiceConfigWithId({ invoiceConfig: response.result, businessId: activeBusiness._id }))
                }
            } catch (error) {
                formik.setValues({
                    ...formik.values,
                    ...invoiceConfig,
                    invoiceHeading: {
                        ...invoiceConfig.invoiceHeading,
                        heading: activeBusiness.name,
                        subHeading: activeBusiness.catagory,
                    },
                    invoiceFrom: {
                        ...invoiceConfig.invoiceFrom,
                        postalCode: "",
                        phone: "",
                    },
                    invoiceDetails: {
                        ...invoiceConfig.invoiceDetails,
                        invoiceNo: "",
                        HSN: "",
                        stateCode: "",
                        invoiceDate: new Date(),
                        dueDate: new Date(),
                    },
                    additionalInfo: {
                        ...invoiceConfig.additionalInfo,
                        paymentMethod: "Cash",
                        paymentStatus: "Processing",
                    }
                })
                dispatch(setInvoiceConfigWithId({
                    invoiceConfig: {
                        ...invoiceConfig,
                        invoiceHeading: {
                            ...invoiceConfig.invoiceHeading,
                            heading: activeBusiness.name,
                            subHeading: activeBusiness.catagory,
                        }
                    },
                    businessId: activeBusiness._id
                }));

            } finally {
                formik.setFieldValue("additionalInfo.isTransportInvoice",
                    activeBusiness.catagory === "Transport" ? true : false);
                setLoading(false)
            }
        }
        if (activeBusiness._id !== storedConfigBusinessId || storedConfigBusinessId === undefined) {
            loadData()
        } else {
            if (storedInvoiceConfig) {
                formik.setValues({
                    ...formik.values,
                    ...storedInvoiceConfig,
                    invoiceFrom: {
                        ...storedInvoiceConfig.invoiceFrom,
                        postalCode: String(storedInvoiceConfig.invoiceFrom.postalCode),
                        phone: String(storedInvoiceConfig.invoiceFrom.phone),
                    },
                    invoiceDetails: {
                        ...storedInvoiceConfig.invoiceDetails,
                        invoiceDate: new Date(),
                        dueDate: new Date(),
                        invoiceNo: String(storedInvoiceConfig.invoiceDetails.invoiceNo),
                        HSN: String(storedInvoiceConfig.invoiceDetails.HSN),
                        stateCode: String(storedInvoiceConfig.invoiceDetails.stateCode),
                    },
                    additionalInfo: {
                        ...storedInvoiceConfig.additionalInfo,
                        paymentMethod: "Cash",
                        paymentStatus: "Processing",
                    }
                });
                formik.setFieldValue("additionalInfo.isTransportInvoice",
                    activeBusiness.catagory === "Transport" ? true : false);
            } else {
                loadData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBusiness._id]);


    return (
        <div>
            <Form
                onSubmit={formik.handleSubmit}
                className="flex flex-col  space-y-4 pb-10 border md:px-10"
                autoComplete="off"
            >
                {loading ? (
                    <InvoiceSkeleton />
                ) : (
                    <div className="">
                        <p className="text-sm px-4 mt-4 text-blue-500">Note: Some fields are optional. Leave them blank if not applicable.</p>
                        {/* Error Summary */}
                        {isError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 text-xs" role="alert">
                            <p className="font-bold">Error:</p>
                            <p>Please fill all required fields.</p>
                        </div>}
                        <div id="invoice" className=" invoice   flex-col space-y-8 py-8 ">
                            {/* Invoice Header Form  */}
                            <InvoiceHeaderForm handleChange={formik.handleChange} />
                            {/* Invoice Secondary Header */}
                            {/* Invoice Details */}
                            <div className="md:flex md:flex-row-reverse space-y-5  w-full p-4">
                                <InvoiceDetailsForm formik={formik} />
                                {/* Sender Details Includes FROM and TO */}
                                <InvoiceSecondaryHeaderForm formik={formik} />
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
                            <BankDetailsForm handleChange={formik.handleChange} isBankDetails={formik.values.additionalInfo.isBankDetails} />
                        </div>
                        <div className="px-4">
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full md:w-1/4 rounded-none flex items-center justify-center gap-2 h-10"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Creating Invoice...</span>
                                    </>
                                ) : (
                                    <span>Create Invoice</span>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    )
}

export { InvoiceDataForm };


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenErrors = (errors: Record<string, any>, prefix = ''): Record<string, string> => {
    let flatErrors: Record<string, string> = {};
    for (const key in errors) {
        if (typeof errors[key] === 'object' && errors[key] !== null) {
            flatErrors = {
                ...flatErrors,
                ...flattenErrors(errors[key], `${prefix}${key}.`),
            };
        } else {
            flatErrors[`${prefix}${key}`] = errors[key];
        }
    }
    return flatErrors;
};
