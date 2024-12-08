/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker } from "@/components/reuse/DateSelector";
import { Button } from "@/components/ui/button";
import { invoiceConfig } from "@/config/invoice";
import { setInvoiceConfig } from "@/store/slices/configSlice";
import { RootState } from "@/store/store";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceConfig, InvoiceFormData } from "../../types";
import BankDetailsForm from "./BankDetails";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import InvoiceHeaderForm from "./InvoiceHeaderForm";
import InvoiceSecondaryHeaderForm from "./InvoiceSecondaryHeaderForm";
import { ProductsFieldArray, TransportProductFieldArray } from "./field-arrays";
import { getInvoiceConfig } from "@/api/invoiceConfig";

const InvoiceDataForm = (formik: FormikProps<InvoiceFormData>) => {
    const activeBusiness = useSelector((state: RootState) => state.authContext.activeBusiness);
    const config = useSelector((state: RootState) => state.config);
    const storedInvoiceConfig = config.invoiceConfig;
    const storedConfigBusinessId = config.businessId;
    const dispatch = useDispatch();
    const status = "CREATE"
    // const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadData = async (): Promise<InvoiceConfig | undefined> => {
            try {
                const response = await getInvoiceConfig(activeBusiness._id);
                return response?.result;
            } catch (_error) {
                return undefined;
            }
        };
        const initializeForm = async () => {
            if (status === "CREATE") {
                if (storedInvoiceConfig && storedConfigBusinessId === activeBusiness._id) {
                    formik.setValues({ ...formik.values, ...storedInvoiceConfig });
                } else {
                    const config = await loadData();
                    if (config) {
                        dispatch(setInvoiceConfig({ invoiceConfig: config, businessId: activeBusiness._id }))
                        const uConfig: InvoiceConfig = {
                            ...config,
                            invoiceDetails: {
                                ...config.invoiceDetails,
                                invoiceDate: new Date(),
                            },
                            additionlInfo: {
                                ...config.additionlInfo,
                                isBankDetails: true,
                            }
                        }
                        formik.setValues({ ...formik.values, ...uConfig });
                    } else {
                        formik.setValues({ ...formik.values, ...invoiceConfig });
                    }
                }
            }
        };
        initializeForm();
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
                                                value={formik.values.invoiceDetails.invoiceDate}
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
        </div>
    )
}

export { InvoiceDataForm };
