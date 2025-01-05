import { DatePicker } from '@/components/reuse/DateSelector';
import CustomInput from '@/components/reuse/invoice-input';
import { Field, FormikProps } from 'formik';
import { InvoiceFormData } from '../form-data';

const InvoiceDetailsForm = ({ formik }: { formik: FormikProps<InvoiceFormData> }) => {
    return (
        <div className="w-full md:w-1/2 flex items-start md:justify-end font-sans mt-5">
            <div className="md:max-w-[70%] space-y-1">
                <div className="flex items-center gap-1">
                    <div className="text-sm w-[30%] font-bold ">InoviceNo</div>
                    <div className="flex w-[70%] gap-1">
                        <Field
                            className="text-sm w-1/3 self-end" name="invoiceDetails.invoicePrefix" placeholder="INX"
                            component={CustomInput}
                        />
                        <Field
                            className="text-sm w-2/3 self-end" name="invoiceDetails.invoiceNo" placeholder="001"
                            component={CustomInput}
                        />
                    </div>
                </div>
                <div className="flex items-center space-y-1 gap-1">
                    <div className="text-sm w-[30%] font-bold">Invoice Date</div>
                    <div className="flex ">
                        <DatePicker
                            className='shadow-none border-b px-1'
                            value={formik.values.invoiceDetails.invoiceDate}
                            onChange={(date) => formik.setFieldValue('invoiceDetails.invoiceDate', date)}
                        />
                    </div>
                </div>
                <div className="flex items-center space-y-1 gap-1">
                    <div className="text-sm w-[30%] font-bold">Due Date</div>
                    <div className="flex ">
                        <DatePicker
                            className='shadow-none border-b px-1'
                            value={formik.values.invoiceDetails.dueDate}
                            onChange={(date) => formik.setFieldValue('invoiceDetails.dueDate', date)}
                        />
                    </div>
                </div>
                {/* <InvoiceDetailsForm formik={formik} /> */}

                <div className="flex items-center gap-1">
                    <div className="text-sm w-[30%] font-bold">GSTIN</div>
                    <div className="flex w-[70%]">
                        <Field
                            className="text-sm " name="invoiceDetails.GSTIN" placeholder="XYZAB145BG4"
                            component={CustomInput}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="text-sm w-[30%] font-bold">PAN</div>
                    <div className="flex w-[70%]">
                        <Field
                            className="text-sm " name="invoiceDetails.PAN" placeholder="ABCD54FA8"
                            component={CustomInput}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="text-sm w-[30%] font-bold">HSN</div>
                    <div className="flex w-[70%]">
                        <Field
                            className="text-sm " name="invoiceDetails.HSN" placeholder="44"
                            component={CustomInput}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="text-sm w-[30%] font-bold">State Code</div>
                    <div className="flex w-[70%]">
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

