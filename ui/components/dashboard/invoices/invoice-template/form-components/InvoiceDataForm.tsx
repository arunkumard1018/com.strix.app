/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { FormikProps } from "formik";
import { useEffect } from "react";
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
    const storedConfigBusinessId = config.businessId;
    const dispatch = useDispatch();
    const status = "CREATE"
    // const [loading, setLoading] = useState(false);
    useEffect(() => {
        const initializeForm = () => {
            if (storedInvoiceConfig) {
                formik.setValues({ ...formik.values, ...storedInvoiceConfig, invoiceDetails: { ...storedInvoiceConfig.invoiceDetails, invoiceDate: new Date() } })
            }
        }
        if (activeBusiness._id !== storedConfigBusinessId && status === 'CREATE') {
            initializeForm()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBusiness._id, storedInvoiceConfig, storedConfigBusinessId]);


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

