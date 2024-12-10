import { DatePicker } from '@/components/reuse/DateSelector';
import CustomInput from '@/components/reuse/invoice-input';
import { Field, FormikProps } from 'formik';
import { InvoiceFormData } from '../../types';

const InvoiceDetailsForm = ({ formik }: { formik: FormikProps<InvoiceFormData> }) => {
    return (
        <div className="w-full md:w-1/2 flex items-start justify-end font-sans mt-5">
            <div className="md:max-w-[70%] space-y-2">
                <div className="flex items-center space-y-1">
                    <div className="text-sm w-[40%] font-bold">InvoiceDate</div>
                    <div className="flex w-[60%]">
                        <DatePicker
                            value={formik.values.invoiceDetails.invoiceDate}
                            onChange={(date) => formik.setFieldValue('invoiceDetails.invoiceDate', date)}
                        />
                    </div>
                </div>
                {/* <InvoiceDetailsForm formik={formik} /> */}
                <div className="flex items-center gap-1">
                    <div className="text-sm w-[40%] font-bold">InoviceNo</div>
                    <div className="flex w-[60%] gap-1">
                        <Field
                            className="text-sm w-1/2" name="invoiceDetails.invoicePrefix" placeholder="INX"
                            component={CustomInput}
                        />
                        <Field
                            className="text-sm w-1/2" name="invoiceDetails.invoiceNo" placeholder="001"
                            component={CustomInput}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="text-sm w-[40%] font-bold">GSTIN</div>
                    <div className="flex w-[60%]">
                        <Field
                            className="text-sm " name="invoiceDetails.GSTIN" placeholder="XYZAB145BG4"
                            component={CustomInput}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="text-sm w-[40%] font-bold">PAN</div>
                    <div className="flex w-[60%]">
                        <Field
                            className="text-sm " name="invoiceDetails.PAN" placeholder="ABCD54FA8"
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
    )
}

export { InvoiceDetailsForm };

