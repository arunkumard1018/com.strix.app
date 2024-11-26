"use client";

import { Button } from "@/components/ui/button";
import { numberToWords } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface TableRowData {
    sku: string;
    productName: string;
    price: number;
    quantity: number;
    gst: number;
    total: number;
}

const DynamicTable = () => {
    const [rows, setRows] = useState<TableRowData[]>([
        { sku: "", productName: "", price: 0, quantity: 0, gst: 0, total: 0 },
    ]);

    const addRow = () => {
        setRows([...rows, { sku: "", productName: "", price: 0, quantity: 0, gst: 0, total: 0 }]);
    };

    const deleteRow = (index: number) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleInputChange = (index: number, field: keyof TableRowData, value: string | number) => {
        const updatedRows = rows.map((row, i) =>
            i === index
                ? {
                    ...row,
                    [field]: typeof value === "number" ? value : value,
                    total:
                        field === "price" || field === "quantity" || field === "gst"
                            ? row.price * row.quantity * (1 + row.gst / 100)
                            : row.total,
                }
                : row
        );
        setRows(updatedRows);
    };

    const calculateSummary = () => {
        const totalDetails = rows.reduce(
            (acc, row) => {
                acc.total += row.price * row.quantity;
                acc.gst += (row.price * row.quantity * row.gst) / 100;
                acc.grandTotal += row.total;
                return acc;
            },
            { total: 0, gst: 0, grandTotal: 0 }
        );
        return totalDetails;
    };

    const { total, gst, grandTotal } = calculateSummary();

    return (
        <div className="bg-white text-black">
            <table className="w-full ">
                <thead className="">
                    <tr className="bg-gray-100 text-left " id="t-head">
                        <th className=" px-2">SKU</th>
                        <th className=" px-2">Name</th>
                        <th className=" px-2 text-right">Price</th>
                        <th className=" px-2 text-right">Quantity</th>
                        <th className=" px-2 text-right">GST (%)</th>
                        <th className=" px-2 text-right">Amount</th>
                        <th className="px-2 no-print bg-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-0">
                                <input
                                    value={row.sku}
                                    onChange={(e) => handleInputChange(index, "sku", e.target.value)}
                                    placeholder="Enter SKU"
                                    className="focus:outline-none focus:border-none focus:border-transparent focus:ring-0 w-full  rounded-none shadow-none border-none px-2 py-0"
                                />
                            </td>
                            <td className=" p-0">
                                <input
                                    value={row.productName}
                                    onChange={(e) => handleInputChange(index, "productName", e.target.value)}
                                    placeholder="Product Name"
                                    className="w-full h-full rounded-none shadow-none border-none px-2"
                                />
                            </td>
                            <td className=" p-0">
                                <input
                                    type="number"
                                    value={row.price}
                                    onChange={(e) => handleInputChange(index, "price", Number(e.target.value))}
                                    placeholder="0"
                                    className="w-full h-full rounded-none shadow-none border-none text-right"
                                />
                            </td>
                            <td className=" p-0">
                                <input
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) => handleInputChange(index, "quantity", Number(e.target.value))}
                                    placeholder="0"
                                    className="w-full h-full rounded-none shadow-none border-none text-right"
                                />
                            </td>
                            <td className=" p-0">
                                <input
                                    type="number"
                                    value={row.gst}
                                    onChange={(e) => handleInputChange(index, "gst", Number(e.target.value))}
                                    placeholder="0"
                                    className="w-full h-full rounded-none shadow-none border-none text-right"
                                />
                            </td>
                            <td className=" text-right">{row.total.toFixed(2)}</td>
                            <td className=" no-print ">
                                <Trash2
                                    onClick={() => deleteRow(index)}
                                    size={10}
                                    className="cursor-pointer hover:text-red-500"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between">
                <div className="flex flex-col justify-between w-full">
                    <div><Button onClick={addRow} className="no-print rounded-none bg-blue-500 text-white hover:bg-blue-600">
                        Add Row
                    </Button></div>
                    {grandTotal > 0 && <div className="pb-1 w-[85%] text-xs">{numberToWords(Math.ceil(grandTotal))} Only.</div>}
                </div>
                <table className="w-[40%]">
                    <tbody>
                        <tr>
                            <td className="font-semibold ">Sub Total</td>
                            <td className="text-right ">{total.toFixed(2)}</td>
                        </tr>
                        <tr className="total border-b">
                            <td className="font-semibold  ">GST</td>
                            <td className="text-right">{gst.toFixed(2)}</td>
                        </tr>
                        <tr className="">
                            <td className="font-semibold ">Total</td>
                            <td className="text-right ">{Math.ceil(grandTotal).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DynamicTable;
