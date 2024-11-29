import { numberToWords } from "@/lib/utils";
import React from "react";
import { InvoiceProduct } from "../invoices-form";



function InvoiceProductsTable({ invoiceProducts }: { invoiceProducts: InvoiceProduct[] }) {
    // Calculate summary totals (subtotal, GST, and grand total)
    const calculateSummary = () => {
        return invoiceProducts.reduce(
            (acc, product) => {
                const subtotal = product.price * product.qty;
                const gstAmount = (subtotal * (product.cgst + product.sgst)) / 100;
                const total = subtotal + gstAmount;
                acc.total += subtotal;
                acc.gst += gstAmount;
                acc.grandTotal += total;
                return acc;
            },
            { total: 0, gst: 0, grandTotal: 0 }
        );
    };

    const { total, gst, grandTotal } = calculateSummary();

    return (
        <div className="bg-white text-black w-full">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-100 text-left border-b border-black" id="t-head">
                        {/* <th className="px-2">SKU</th> */}
                        <th className="w-1/2">Description</th>
                        <th className="px-2 text-right">Price</th>
                        <th className="px-2 text-right">Quantity</th>
                        <th className="px-2 text-right">CGST </th>
                        <th className="px-2 text-right">SGST</th>
                        <th className="px-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceProducts.map((product, index) => (
                        <tr key={index} className="border-b">
                            {/* <td className="p-2">{product.sku}</td> */}
                            <td className="w-1/2">{product.description}</td>
                            <td className="p-2 text-right">{product.price}</td>
                            <td className="p-2 text-right">{product.qty}</td>
                            <td className="p-2 text-right">{product.cgst}%</td>
                            <td className="p-2 text-right">{product.sgst}%</td>
                            <td className="p-2 text-right">{(product.price * product.qty).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between">
                <div className="flex flex-col justify-between w-full">
                    {grandTotal > 0 && (
                        <div className="pb-1 w-[85%] text-xs">
                            {numberToWords(Math.ceil(grandTotal))} Only.
                        </div>
                    )}
                </div>
                <table className="w-[40%]">
                    <tbody>
                        <tr>
                            <td className="font-semibold">Sub Total</td>
                            <td className="text-right">{total.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">GST</td>
                            <td className="text-right">{gst.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Grand Total</td>
                            <td className="text-right">{Math.ceil(grandTotal).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvoiceProductsTable;
