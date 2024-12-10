import { cn, formatCurrency, formatDateDDMMYY, formatRupee, numberToWordsIndian } from "@/lib/utils";
import '../invoice.css';
import { calculateInvoiceSummaryForProductsTransport, formatToTwoDecimalPlaces } from "./form-components/calculations";
import { InvoiceFormData } from "../types";


function InvoiceProductsTableTransport({ invoiceConfig: invoiceFormData }: { invoiceConfig: InvoiceFormData }) {
    // Format prices, CGST, SGST and calculate amounts
    invoiceFormData.invoiceProductsTransport = invoiceFormData.invoiceProductsTransport.map((product) => {
        // Parse and format inputs to floats with 2 decimal places
        const price = formatToTwoDecimalPlaces(product.price);
        const cgst = formatToTwoDecimalPlaces(product.cgst);
        const sgst = formatToTwoDecimalPlaces(product.sgst);
        // Calculate the amount for each product
        const amount = price + (price * cgst) / 100 + (price * sgst) / 100;
        return {
            ...product,
            price,
            cgst,
            sgst,
            amount: formatToTwoDecimalPlaces(amount), // Ensure 2 decimal places
        };
    });
    // Calculate the summary totals (subtotal, GST, and grand total)
    invoiceFormData.invoicesummary = calculateInvoiceSummaryForProductsTransport(invoiceFormData.invoiceProductsTransport);
    const { totalPrice, cgst, sgst, invoiceAmount } = invoiceFormData.invoicesummary;

    return (
        <div className="bg-background w-full">
            <table className="w-full text-sm table-fixed border-collapse">
                <thead className="bg-muted-foreground/20 ">
                    <tr className="text-left " id="t-head">
                        <th className="px-2 py-1 w-24 font-medium ">Date</th>
                        <th className="px-1 py-1 w-28 font-medium">Vehicle No</th>
                        <th className="px-1 py-1 w-28 font-medium">Source</th>
                        <th className="px-1 py-1 w-28 font-medium">Destination</th>
                        <th className="px-1 text-left w-20 font-medium">Price</th>
                        <th className="px-1 text-center w-16 font-medium">CGST</th>
                        <th className="px-1 text-center w-16 font-medium">SGST</th>
                        <th className="px-2 text-right w-32 font-medium">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceFormData.invoiceProductsTransport.map((product, index) => (
                        <tr key={index} className={cn("py-1",(index!==invoiceFormData.invoiceProductsTransport.length-1)&&"border-b border-b-muted-foreground/20")}>
                            <td className="p-1 px-2">{formatDateDDMMYY(product.date.toLocaleDateString())}</td>
                            <td className="p-1 px-1">{product.vehicleNo}</td>
                            <td className="p-1 px-1">{product.source}</td>
                            <td className="p-1 px-1">{product.destination}</td>
                            <td className="p-1 text-left">{formatRupee(product.price)}</td>
                            <td className="p-1 text-center">{product.cgst}%</td>
                            <td className="p-1 text-center">{product.sgst}%</td>
                            <td className="p-1 text-right px-2">{formatRupee(product.amount)}</td>
                        </tr>
                    ))}
                    <tr id="summary" className="bg-muted-foreground/20">
                        <td colSpan={6} className="px-1">
                            {invoiceAmount > 0 && (
                                <div className="text-xs">
                                    <span className="font-medium mx-2">Rupees:</span>
                                    {numberToWordsIndian(Math.ceil(invoiceAmount))} Only.
                                </div>
                            )}
                        </td>
                        <td className="text-center font-medium">Gross:</td>
                        <td className="text-right p-1 px-2">{formatCurrency(invoiceAmount)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-end mt-4">
                <table className="w-[37%] text-sm">
                    <tbody>
                        <tr>
                            <td className="font-medium px-2">Total Price</td>
                            <td className="text-right pr-2">{formatRupee(totalPrice)}</td>
                        </tr>
                        <tr>
                            <td className="font-medium px-2">CGST</td>
                            <td className="text-right pr-2">{formatRupee(cgst)}</td>
                        </tr>
                        <tr className="py-2">
                            <td className="font-medium px-2">SGST</td>
                            <td className="text-right pr-2">{formatRupee(sgst)}</td>
                        </tr>
                        <tr className="bg-muted-foreground/20 py-4">
                            <td className="font-semibold py-1 px-2">Total Amount</td>
                            <td className="text-right pr-2">{formatCurrency(invoiceAmount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { InvoiceProductsTableTransport };

