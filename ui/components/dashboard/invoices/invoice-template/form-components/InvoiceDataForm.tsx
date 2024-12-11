/* eslint-disable @typescript-eslint/no-unused-vars */
import { getInvoiceConfig } from "@/api/invoiceConfig";
import { Button } from "@/components/ui/button";
import { invoiceConfig } from "@/config/invoice";
import { setInvoiceConfig } from "@/store/slices/configSlice";
import { RootState } from "@/store/store";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceFormData } from "../../types";
import BankDetailsForm from "./BankDetails";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import InvoiceHeaderForm from "./InvoiceHeaderForm";
import InvoiceSecondaryHeaderForm from "./InvoiceSecondaryHeaderForm";
import { ProductsFieldArray, TransportProductFieldArray } from "./field-arrays";

const InvoiceDataForm = (formik: FormikProps<InvoiceFormData>) => {
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
                console.log("Loading Data")
                const response = await getInvoiceConfig(activeBusiness._id);
                if (response.result) {
                    formik.setValues({
                        ...formik.values, ...response.result,
                        invoiceDetails: {
                            ...response.result.invoiceDetails,
                            invoiceDate: new Date()
                        }
                    })
                    dispatch(setInvoiceConfig({ invoiceConfig: response.result, businessId: activeBusiness._id }))
                }
            } catch (error) {
                formik.setValues({
                    ...formik.values,
                    ...invoiceConfig,
                    invoiceDetails: {
                        ...invoiceConfig.invoiceDetails,
                        invoiceDate: new Date(),
                    },
                })
                dispatch(setInvoiceConfig({ invoiceConfig: invoiceConfig, businessId: activeBusiness._id }));

            } finally {
                formik.setFieldValue("additionlInfo.isTransportInvoice",
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
                    invoiceDetails: {
                        ...storedInvoiceConfig.invoiceDetails,
                        invoiceDate: new Date(),
                    },
                });
                formik.setFieldValue("additionlInfo.isTransportInvoice",
                    activeBusiness.catagory === "Transport" ? true : false);
            } else {
                loadData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBusiness._id]);


    return (
        <div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col  space-y-4 pb-10 border md:px-10"
                autoComplete="off"
            >
                <div className="">
                    <p className="text-sm px-4 mt-4 text-blue-500">Note: Some fields are optional. Leave them blank if not applicable.</p>
                    <div id="invoice" className=" invoice   flex-col space-y-8 py-8 ">
                        {/* Invoice Header Form  */}
                        <InvoiceHeaderForm handleChange={formik.handleChange} />
                        {/* Invoice Secondary Header */}
                        {/* Invoice Details */}
                        <div className="md:flex md:flex-row-reverse space-y-5  w-full p-4">
                            <InvoiceDetailsForm formik={formik} />
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
                    <div className="px-4">

                        <Button type="submit" className="w-1/4 rounded-none"> Create Invoice</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export { InvoiceDataForm };

