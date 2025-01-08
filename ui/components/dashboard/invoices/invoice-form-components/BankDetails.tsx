import CustomInput, { CustomSelect } from '@/components/reuse/invoice-input';
import { cn } from '@/lib/utils';
import { Field, FormikProps } from 'formik';
import React from 'react';
import { InvoiceFormData } from '../form-data';
interface BankDetailsProps {
    handleChange: FormikProps<InvoiceFormData>["handleChange"];
    isBankDetails: boolean;
}

const BankDetailsForm: React.FC<BankDetailsProps> = ({ isBankDetails }) => {
    return (
        <>
            <div className="font-serif text-xl  font-bold flex items-center">
                <Field
                    type="checkbox"
                    name="additionalInfo.isBankDetails"
                    className="h-4  w-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Bank Details
            </div>
            <div className="md:flex justify-between w-full">
                {isBankDetails && (<div className="w-full md:w-1/2">
                    <div className="font-sans space-y-2">
                        <div className="flex w-full items-center justify-start space-x-5">
                            <p className="w-[25%]">Name:</p>
                            <Field
                                className="text-sm w-[75%]"
                                name="bankDetails.accountName"
                                placeholder="AB Enterprises"
                                component={CustomInput}
                            />
                        </div>
                        <div className="flex w-full items-center justify-start space-x-5">
                            <p className="w-[25%]">Bank Name:</p>
                            <Field
                                className="text-sm w-[75%]"
                                name="bankDetails.bankName"
                                placeholder="HDFC Bank"
                                component={CustomInput}
                            />
                        </div>
                        <div className="flex w-full items-center justify-start space-x-5">
                            <p className="w-[25%]">Account No:</p>
                            <Field
                                className="text-sm w-[75%]"
                                name="bankDetails.accountNumber"
                                placeholder="1234567890"
                                component={CustomInput}
                            />
                        </div>
                        <div className="flex w-full items-center justify-start space-x-5">
                            <p className="w-[25%]">IFSC Code:</p>
                            <Field
                                className="text-sm w-[75%]"
                                name="bankDetails.ifscCode"
                                placeholder="XYZ123456"
                                component={CustomInput}
                            />
                        </div>
                        <div className="flex w-full items-center justify-start space-x-5">
                            <p className="w-[25%]">Branch :</p>
                            <Field
                                className="text-sm w-[75%]"
                                name="bankDetails.branch"
                                placeholder="MG Road Branch"
                                component={CustomInput}
                            />
                        </div>
                    </div>
                </div>)}
                <div className={cn("w-full md:w-1/2 flex flex-col my-5 md:my-0  md:justify-end  font-sans", isBankDetails && "md:items-end")}>
                    <div className='md:w-[75%] '>
                        <Field
                            name="additionalInfo.paymentStatus"
                            label="Payment Status"
                            className="w-[75%] rounded-none"
                            component={CustomSelect}
                            options={[
                                { value: 'Paid', label: 'Paid' },
                                { value: 'Processing', label: 'Processing' },
                                { value: 'Due', label: 'Due' },
                            ]}
                        />
                        <Field
                            name="additionalInfo.paymentMethod"
                            label="Payment Method"
                            className="w-[75%]"
                            component={CustomSelect}
                            options={[
                                { value: 'Cash', label: 'Cash' },
                                { value: 'UPI', label: 'UPI' },
                                { value: 'BankTransfer', label: 'Bank Transfer' },
                            ]}
                        />
                    </div>
                    <div className='md:w-[75%] mt-10'>Additional Info</div>
                    <Field
                        className="text-sm md:w-[75%] w-full " name="additionalInfo.thankyouNote" placeholder="BHJ766FASD"
                        component={CustomInput}
                    />
                </div>
            </div>
        </>
    );
};

export default BankDetailsForm;
