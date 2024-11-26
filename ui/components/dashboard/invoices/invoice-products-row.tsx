import { Field, FormikProps } from "formik";
import { InvoiceConfig } from "./invoices-form";

export const InvoiceProductRow = ({
    idx,
    handleChange,
    values,
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
        <div className="flex">
            {/* <div
                onClick={() => removeRow(idx)}
                className="text-red-500 flex items-center pr-2"
            ><Trash2Icon className="w-4" /></div> */}
            <div className="flex w-1/2">
                <Field
                    name={`invoiceProducts[${idx}].sku`}
                    placeholder="SKU"
                    className="p-1 border w-1/4 outline-none"
                    onChange={handleChange}
                />
                <Field
                    name={`invoiceProducts[${idx}].description`}
                    placeholder="Description"
                    className="w-full p-1 border"
                    onChange={handleChange}
                />
            </div>
            <div className="flex w-1/2 ">
                <Field
                    name={`invoiceProducts[${idx}].price`}
                    placeholder="Price"
                    className="border w-full pl-1"
                    onChange={handleChange}
                    type="number"
                />
                <Field
                    name={`invoiceProducts[${idx}].qty`}
                    placeholder="qty"
                    className="border w-full pl-1"
                    onChange={handleChange}
                    type="number"
                />
                <Field
                    name={`invoiceProducts[${idx}].cgst`}
                    placeholder="CGST (%)"
                    className="w-full border pl-1"
                    onChange={handleChange}
                    type="number"
                />
                <Field
                    name={`invoiceProducts[${idx}].sgst`}
                    placeholder="SGST (%)"
                    className="w-full border pl-1"
                    onChange={handleChange}
                    type="number"
                />
                <div className="p-2 w-full">{totalAmount?.toFixed(2)}</div>
            </div>
        </div>
    );
};
