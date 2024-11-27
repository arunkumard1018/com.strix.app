import CustomInput from "@/components/reuse/invoice-input";
import { Field, FormikProps } from "formik";
import { Trash2Icon } from "lucide-react";
import { InvoiceConfig } from "./invoices-form";

export const InvoiceProductRow = ({
    idx,
    values,
    removeRow,
}: {
    idx: number;
    handleChange: FormikProps<InvoiceConfig>["handleChange"];
    values: InvoiceConfig;
    removeRow: (index: number) => void;
}) => {
    const product = values.invoiceProducts[idx];

    // const totalAmount = product.price && product.cgst && product.sgst
    //     ? product.price + (product.price * (product.cgst + product.sgst)) / 100
    //     : 0;
    const totalAmount = product.price && product.qty ? product.price * product.qty : 0;

    return (
        <tr className="text-sm">
            <td className="text-center">
                <Field
                    className="text-sm border-none shadow-none w-full text-center"
                    name={`invoiceProducts[${idx}].sku`}
                    placeholder={idx + 1}
                    component={CustomInput}
                />
            </td>
            <td className="text-xs break-words whitespace-normal leading-tight">
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
            <td className="text-center">
                {totalAmount.toFixed(2)}
            </td>
            <td className=" px-2 text-center" onClick={() => removeRow(idx)}>
                <Trash2Icon className="w-3 h-3  cursor-pointer transition-transform transform hover:scale-110 focus:outline-none" />
            </td>
        </tr>
    );
};


// <div
//     onClick={() => removeRow(idx)}
//     className="text-red-500 flex items-center pr-2"
// ><Trash2Icon className="w-4" /></div>