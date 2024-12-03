import CustomInput from '@/components/reuse/invoice-input';
import { Field, FormikProps } from 'formik';
import { InvoiceFormData } from '../../types';

interface InvoiceDetailsFormProps {
    handleChange: FormikProps<InvoiceFormData>["handleChange"];
}

const InvoiceDetailsForm: React.FC<InvoiceDetailsFormProps> = () => {

    return (
        <>
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
        </>
    )
}

export { InvoiceDetailsForm };
