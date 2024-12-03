import { formatCurrency, formatRupee, numberToWordsIndian } from "@/lib/utils";
import '../invoice.css';
import { calculateInvoiceSummaryForProducts, formatToTwoDecimalPlaces } from "./form-components/calculations";
import { InvoiceFormData } from "../types";

function InvoiceProductsTable({ invoiceConfig: invoiceFormData }: { invoiceConfig: InvoiceFormData }) {
    // Format prices, CGST, SGST and calculate amounts
    invoiceFormData.invoiceProducts = invoiceFormData.invoiceProducts.map((product) => {
        // Parse and format inputs to floats with 2 decimal places
        const price = formatToTwoDecimalPlaces(product.price);  
        const qty = formatToTwoDecimalPlaces(product.qty);  
        const cgst = formatToTwoDecimalPlaces(product.cgst);
        const sgst = formatToTwoDecimalPlaces(product.sgst);
        // Calculate the amount for each product
        const amount = (price + (price * cgst) / 100 + (price * sgst) / 100) * qty;
        return {
            ...product,
            price,
            qty,
            cgst,
            sgst,
            amount: formatToTwoDecimalPlaces(amount), // Ensure 2 decimal places
        };
    });
    // Calculate the summary totals (subtotal, GST, and grand total)
    invoiceFormData.invoicesummary = calculateInvoiceSummaryForProducts(invoiceFormData.invoiceProducts);
    const { totalPrice, cgst, sgst, invoiceAmount } = invoiceFormData.invoicesummary;
    return (
        <div className="bg-background  w-full">
            <table className="table-auto w-full text-sm">
                <thead className="bg-muted-foreground/20">
                    <tr className="text-left" id="t-head">
                        <th className="px-1 py-1">ID</th>
                        <th className="w-1/2 px-1 py-1">Description</th>
                        <th className="px-1 text-left">Price</th>
                        <th className="px-1 text-center">Qty</th>
                        <th className="px-1 text-center">CGST</th>
                        <th className="px-1 text-center">SGST</th>
                        <th className="px-1 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceFormData.invoiceProducts.map((product, index) => (
                        <tr key={index} className="border-b border-b-gray-300 py-1">
                            <td className="p-1">{product.sku}</td>
                            <td className="w-1/2 px-1">{product.description}</td>
                            <td className="p-1 text-left">{formatRupee(product.price)}</td>
                            <td className="p-1 text-center">{product.qty}</td>
                            <td className="p-1 text-center">{product.cgst}%</td>
                            <td className="p-1 text-center">{product.sgst}%</td>
                            <td className="p-1 text-right">{formatRupee(product.price * product.qty)}</td>
                        </tr>
                    ))}
                    <tr id="summary" className="bg-muted-foreground/20">
                        <td colSpan={5} className="px-1">
                            {totalPrice > 0 && (
                                <div className="text-xs">
                                    <span className="font-medium mx-2">Rupees:</span>
                                    {numberToWordsIndian(Math.ceil(invoiceAmount))} Only.
                                </div>
                            )}
                        </td>
                        <td className="text-right font-bold">Gross:</td>
                        <td className="text-right  p-1">{formatCurrency(invoiceAmount)}</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-end mt-2">
                <table className="w-[35%] text-sm">
                    <tbody>
                        <tr>
                            <td className="font-semibold border-r border-r-muted-foreground/30">Total Price</td>
                            <td className="text-right pr-2">{formatRupee(totalPrice)}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold border-r border-r-muted-foreground/30">CGST</td>
                            <td className="text-right pr-2">{formatRupee(cgst)}</td>
                        </tr>
                        <tr className="border-b border-b-muted-foreground/30">
                            <td className="font-semibold border-r border-r-muted-foreground/30">SGST</td>
                            <td className="text-right pr-2">{formatRupee(sgst)}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold border-r border-r-muted-foreground/30">Total Amount</td>
                            <td className="text-right pr-2">{formatCurrency(invoiceAmount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvoiceProductsTable;
