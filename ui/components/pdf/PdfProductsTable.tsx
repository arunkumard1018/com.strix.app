import { formatCurrency, formatDateDDMMYY, formatRupee, numberToWordsIndian } from "@/lib/utils"; // Make sure these functions work with PDF renderer
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { InvoiceProduct, InvoiceProductTransport, InvoiceSummary } from "../dashboard/invoices/types";
import path from "path";
// import NotoSansFont from "./NotoSans-Bold.ttf";

// Register Noto Sans from Google Fonts
const fontPath = path.resolve('./public/fonts/NotoSans-Bold.ttf');

Font.register({
    family: 'Noto Sans',
    fonts: [
        {
            src: fontPath
        },
    ],
});

// Define styles for the table
const styles = StyleSheet.create({
    section: { marginBottom: 10, marginTop: 10, width: "100%" },
    table: { width: "100%", borderCollapse: "collapse" },
    tableHeader: { backgroundColor: "#f0f0f0" },
    headerCell: { padding: 5, textAlign: "left", fontSize: 10 },
    cell: { padding: 5, fontSize: 8 },
    summaryCell: { padding: 5, fontSize: 10 },
    totalCell: { padding: 5, textAlign: "right", fontSize: 10 },
    tableFooter: { marginTop: 10, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" },
    summaryTable: { width: "40%", textAlign: "right", marginTop: 10 },
    totalAmountCell: { fontSize: 12 },
    rupeeText: {
        fontFamily: 'Noto Sans',
        fontSize: 12,
    },
});
function PdfInvoiceProductsTable({
    products,
    invoiceSummary
}: {
    products: Array<InvoiceProduct | InvoiceProductTransport>
    invoiceSummary: InvoiceSummary
}) {
    const isTransportInvoice = products.length > 0 && 'vehicleNo' in products[0];
    // Format prices only
    // const formattedProducts = products.map((product) => ({
    //     ...product,
    //     price: formatToTwoDecimalPlaces(product.price),
    //     cgst: formatToTwoDecimalPlaces(product.cgst),
    //     sgst: formatToTwoDecimalPlaces(product.sgst),
    //     amount: formatToTwoDecimalPlaces(product.amount)
    // }));
    const { totalPrice, cgst, sgst, invoiceAmount } = invoiceSummary;

    return (
        <View style={styles.section}>
            {/* Table header */}
            <View style={styles.tableHeader}>
                <View style={{ flexDirection: "row" }}>
                    {isTransportInvoice ? (
                        <>
                            <Text style={[styles.headerCell, { width: "15%" }]}>Date</Text>
                            <Text style={[styles.headerCell, { width: "15%" }]}>Vehicle No</Text>
                            <Text style={[styles.headerCell, { width: "20%" }]}>Source</Text>
                            <Text style={[styles.headerCell, { width: "20%" }]}>Destination</Text>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.headerCell, { width: "45%" }]}>Description</Text>
                            <Text style={[styles.headerCell, { width: "9%" }]}>Qty</Text>
                        </>
                    )}
                    <Text style={[styles.headerCell, { width: "15%" }]}>Price</Text>
                    <Text style={[styles.headerCell, { width: "8%", textAlign: "center" }]}>SGST</Text>
                    <Text style={[styles.headerCell, { width: "8%", textAlign: "center" }]}>CGST</Text>
                    <Text style={[styles.headerCell, { width: "15%", textAlign: "right" }]}>Amount</Text>
                </View>
            </View>

            {/* Table rows */}
            {products.map((product, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                    {isTransportInvoice ? (
                        <>
                            <Text style={[styles.cell, { width: "15%" }]}>{formatDateDDMMYY((product as InvoiceProductTransport).date.toString())}</Text>
                            <Text style={[styles.cell, { width: "15%" }]}>{(product as InvoiceProductTransport).vehicleNo}</Text>
                            <Text style={[styles.cell, { width: "20%" }]}>{(product as InvoiceProductTransport).source}</Text>
                            <Text style={[styles.cell, { width: "20%" }]}>{(product as InvoiceProductTransport).destination}</Text>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.cell, { width: "45%" }]}>{(product as InvoiceProduct).description}</Text>
                            <Text style={[styles.cell, { width: "9%" }]}>{(product as InvoiceProduct).qty}</Text>
                        </>
                    )}
                    <Text style={[styles.cell, { width: "15%" }]}>{formatRupee(product.price)}</Text>
                    <Text style={[styles.cell, { width: "8%", textAlign: "center" }]}>{product.sgst}%</Text>
                    <Text style={[styles.cell, { width: "8%", textAlign: "center" }]}>{product.cgst}%</Text>
                    <Text style={[styles.cell, { width: "15%", textAlign: "right" }]}>{formatRupee(product.amount)}</Text>
                </View>
            ))}

            {/* Summary row */}
            <View style={{ flexDirection: "row", backgroundColor: "#f0f0f0" }}>
                <Text style={[styles.summaryCell, { width: "70%" }]}>
                    {invoiceAmount > 0 && (
                        <Text style={[styles.rupeeText, { fontSize: 8 }]}>
                            <Text >Rupees: </Text>
                            {numberToWordsIndian(Math.ceil(invoiceAmount))} Only.
                        </Text>
                    )}
                </Text>
                <Text style={[styles.totalCell, styles.rupeeText, { width: "30%", fontSize: 10 }]}>Gross:</Text>
                <Text style={[styles.totalCell, styles.rupeeText, { width: "20%", fontSize: 10, textAlign: "right" }]}>{formatCurrency(invoiceAmount)}</Text>
            </View>

            {/* Summary Table */}
            <View style={styles.tableFooter}>
                <View style={styles.summaryTable}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.summaryCell}>Total Price</Text>
                        <Text style={styles.totalCell}>{formatRupee(totalPrice)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.summaryCell}>CGST</Text>
                        <Text style={styles.totalCell}>{formatRupee(cgst)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.summaryCell}>SGST</Text>
                        <Text style={styles.totalCell}>{formatRupee(sgst)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f0f0f0" }}>
                        <Text style={[styles.summaryCell, styles.totalAmountCell, styles.rupeeText]}>Total Amount</Text>
                        <Text style={[styles.totalCell, styles.totalAmountCell, styles.rupeeText]}>{formatCurrency(invoiceAmount)}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export { PdfInvoiceProductsTable };

