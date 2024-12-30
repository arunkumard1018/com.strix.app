import { formatCurrency, formatDateDDMMYY, formatRupee, numberToWordsIndian } from "@/lib/utils";
import { InvoiceProduct, InvoiceProductTransport, InvoiceSummary } from "../types";

export function InvoiceProductsTable({ 
    products, 
    invoiceSummary 
}: { 
    products: Array<InvoiceProduct | InvoiceProductTransport>
    invoiceSummary: InvoiceSummary 
}) {
    const isTransportInvoice = products.length > 0 && 'vehicleNo' in products[0];
    const { totalPrice, cgst, sgst, invoiceAmount } = invoiceSummary;

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[640px]">
                    <thead className="bg-muted-foreground/30">
                        <tr>
                            {isTransportInvoice ? (
                                <>
                                    <th className="p-2 text-left text-sm w-[15%]">Date</th>
                                    <th className="p-2 text-left text-sm w-[15%]">Vehicle No</th>
                                    <th className="p-2 text-left text-sm w-[20%]">Source</th>
                                    <th className="p-2 text-left text-sm w-[20%]">Destination</th>
                                </>
                            ) : (
                                <>
                                    <th className="p-2 text-left text-sm w-[45%]">Description</th>
                                    <th className="p-2 text-left text-sm w-[9%]">Qty</th>
                                </>
                            )}
                            <th className="p-2 text-left text-sm w-[15%]">Price</th>
                            <th className="p-2 text-center text-sm w-[8%]">SGST</th>
                            <th className="p-2 text-center text-sm w-[8%]">CGST</th>
                            <th className="p-2 text-right text-sm w-[15%]">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {products.map((product, index) => (
                            <tr key={index}>
                                {isTransportInvoice ? (
                                    <>
                                        <td className="p-2 text-xs sm:text-sm">{formatDateDDMMYY((product as InvoiceProductTransport).date.toString())}</td>
                                        <td className="p-2 text-xs sm:text-sm">{(product as InvoiceProductTransport).vehicleNo}</td>
                                        <td className="p-2 text-xs sm:text-sm">{(product as InvoiceProductTransport).source}</td>
                                        <td className="p-2 text-xs sm:text-sm">{(product as InvoiceProductTransport).destination}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-2 text-xs sm:text-sm">{(product as InvoiceProduct).description}</td>
                                        <td className="p-2 text-xs sm:text-sm">{(product as InvoiceProduct).qty}</td>
                                    </>
                                )}
                                <td className="p-2 text-xs sm:text-sm">{formatRupee(product.price)}</td>
                                <td className="p-2 text-center text-xs sm:text-sm">{product.sgst}%</td>
                                <td className="p-2 text-center text-xs sm:text-sm">{product.cgst}%</td>
                                <td className="p-2 text-right text-xs sm:text-sm">{formatRupee(product.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-muted-foreground/30">
                            <td colSpan={isTransportInvoice ? 4 : 2} className="p-2 text-sm">
                                <span className="text-xs hidden sm:inline">
                                    Rupees: {numberToWordsIndian(Math.ceil(invoiceAmount))} Only.
                                </span>
                            </td>
                            <td colSpan={3} className="p-2 text-right text-sm font-medium">Gross:</td>
                            <td className="p-2 text-right text-sm font-medium">{formatCurrency(invoiceAmount)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Summary Table */}
            <div className="flex justify-end mt-6">
                <table className="w-full sm:w-[40%]">
                    <tbody>
                        <tr>
                            <td className="p-2 text-xs sm:text-sm">Total Price</td>
                            <td className="p-2 text-right text-xs sm:text-sm">{formatRupee(totalPrice)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 text-xs sm:text-sm">CGST</td>
                            <td className="p-2 text-right text-xs sm:text-sm">{formatRupee(cgst)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 text-xs sm:text-sm">SGST</td>
                            <td className="p-2 text-right text-xs sm:text-sm">{formatRupee(sgst)}</td>
                        </tr>
                        <tr className="font-medium bg-muted-foreground/30">
                            <td className="p-2 text-xs sm:text-sm">Total Amount</td>
                            <td className="p-2 text-right text-xs sm:text-sm">{formatCurrency(invoiceAmount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
