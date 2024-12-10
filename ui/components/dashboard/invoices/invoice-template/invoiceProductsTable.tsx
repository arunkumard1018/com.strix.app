import { cn, formatCurrency, formatRupee, numberToWordsIndian } from "@/lib/utils";
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
                        <th className="w-1/2 px-2 py-1 font-medium">Description</th>
                        <th className="px-1 text-left font-medium border-none">Price</th>
                        <th className="px-1 text-center font-medium">Qty</th>
                        <th className="px-1 text-center font-medium">CGST</th>
                        <th className="px-1 text-center font-medium">SGST</th>
                        <th className="px-2 text-right font-medium">Amount</th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {invoiceFormData.invoiceProducts.map((product, index) => (
                        <tr key={index} className={cn("border-b border-b-muted-foreground/20 py-1",(index===invoiceFormData.invoiceProducts.length-1) && "border-none")}>
                            <td className="w-1/2 px-2">{product.description}</td>
                            <td className="p-1 text-left">{formatRupee(product.price)}</td>
                            <td className="p-1 text-center">{product.qty}</td>
                            <td className="p-1 text-center">{product.cgst}%</td>
                            <td className="p-1 text-center">{product.sgst}%</td>
                            <td className="p-1 text-right px-2">{formatRupee(product.price * product.qty)}</td>
                        </tr>
                    ))}
                    <tr id="summary" className="bg-muted-foreground/20">
                        <td colSpan={4} className="px-1">
                            {totalPrice > 0 && (
                                <div className="text-xs">
                                    <span className="font-medium mx-2">Rupees:</span>
                                    {numberToWordsIndian(Math.ceil(invoiceAmount))} Only.
                                </div>
                            )}
                        </td>
                        <td className="text-center font-medium">Gross:</td>
                        <td className="text-right  p-1 px-2">{formatCurrency(invoiceAmount)}</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-end mt-5">
                <table className="w-[37%] text-sm">
                    <tbody>
                        <tr>
                            <td className="font-medium px-2">Total Price</td>
                            <td className="text-right pr-2 text-sm">{formatRupee(totalPrice)}</td>
                        </tr>
                        <tr>
                            <td className="font-medium px-2">CGST</td>
                            <td className="text-right pr-2 text-sm">{formatRupee(cgst)}</td>
                        </tr>
                        <tr className="">
                            <td className="font-medium px-2">SGST</td>
                            <td className="text-right pr-2 text-sm">{formatRupee(sgst)}</td>
                        </tr>
                        <tr className="bg-muted-foreground/20 py-1">
                            <td className="font-semibold py-1 px-2">Total Amount</td>
                            <td className="text-right pr-2">{formatCurrency(invoiceAmount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvoiceProductsTable;
