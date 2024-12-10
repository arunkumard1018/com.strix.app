import CustomInput from "@/components/reuse/invoice-input";
import { Field, FormikProps } from "formik";
import { Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { formatRupee } from "@/lib/utils";
import { InvoiceFormData } from "../../types";

export const InvoiceProductRow = ({
    idx,
    removeRow,
    formik
}: {
    idx: number;
    handleChange: FormikProps<InvoiceFormData>["handleChange"];
    formik: FormikProps<InvoiceFormData>;
    removeRow: (index: number) => void;
}) => {
    
    useEffect(() => {
        const updateAmount = () => {
            // Convert strings to floats with fallback to 0 if invalid
            const product = formik.values.invoiceProducts[idx];
            const price = parseFloat(product.price.toString()) || 0;
            const qty = parseFloat(product.qty.toString()) || 0;
            const cgst = parseFloat(product.cgst.toString()) || 0;
            const sgst = parseFloat(product.sgst.toString()) || 0;
            // Calculate CGST and SGST amounts
            const cgstAmount = (price * cgst) / 100;
            const sgstAmount = (price * sgst) / 100;
            // Calculate total amount
            const totalAmount = (price + cgstAmount + sgstAmount)*qty;
            formik.setFieldValue(`invoiceProducts[${idx}].amount`, parseFloat(totalAmount.toString()));
        }
        updateAmount()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.invoiceProducts, idx])
    useEffect(() => {
        const calculateGross = () => {
            return formik.values.invoiceProducts.reduce((acc, product) => {
                const amount = parseFloat(product.amount?.toString()) || 0;
                return acc + amount;
            }, 0);
        };
        const gross = calculateGross();
        formik.setFieldValue(`invoicesummary.invoiceAmount`, gross)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.invoiceProducts[idx].amount])


    return (
        <tr className="text-sm">
            <td className="text-xs break-words whitespace-normal leading-tight ">
                <Field
                    className="text-sm border-none shadow-none w-full"
                    name={`invoiceProducts[${idx}].description`}
                    placeholder="Description"
                    component={CustomInput}
                />
            </td>
            <td className="">
                <Field
                    className="text-sm border-none shadow-none w-full"
                    name={`invoiceProducts[${idx}].price`}
                    placeholder="200.00"
                    step="0.01"
                    min="0"
                    component={CustomInput}
                />
            </td>
            <td className="">
                <Field
                    className="text-sm border-none shadow-none w-full"
                    name={`invoiceProducts[${idx}].qty`}
                    placeholder="2"
                    maxLength={2}
                    component={CustomInput}
                />
            </td>
            <td className="">
                <Field
                    className="text-sm border-none shadow-none w-full"
                    name={`invoiceProducts[${idx}].cgst`}
                    placeholder="12"
                    maxLength={2}
                    component={CustomInput}
                />
            </td>
            <td className="">
                <Field
                    className="text-sm border-none shadow-none w-full "
                    name={`invoiceProducts[${idx}].sgst`}
                    placeholder="12"
                    maxLength={2}
                    component={CustomInput}
                />
            </td>
            <td className="text-center px-2">
                {formatRupee(formik.values.invoiceProducts[idx].amount)}
            </td>
            <td className="px text-center" onClick={() => removeRow(idx)}>
                <Trash2Icon className="w-3 h-3  cursor-pointer transition-transform transform hover:scale-110 focus:outline-none" />
            </td>
        </tr>
    );
};
