import { formatCurrency, formatDateDDMMYY, formatRupee, numberToWordsIndian } from "@/lib/utils"; // Make sure these functions work with PDF renderer
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { calculateInvoiceSummaryForProductsTransport, formatToTwoDecimalPlaces } from "../dashboard/invoices/invoice-template/form-components/calculations";
import { InvoiceProductTransport } from "../dashboard/invoices/types";

// Define styles for the table
const styles = StyleSheet.create({
    section: { marginBottom: 10, width: "100%" },
    table: { width: "100%", borderCollapse: "collapse" },
    tableHeader: { backgroundColor: "#f0f0f0" },
    headerCell: { padding: 5, fontWeight: "bold", textAlign: "left", fontSize: 10 },
    cell: { padding: 5, fontSize: 8 },
    summaryCell: { padding: 5, fontWeight: "bold", fontSize: 10 },
    totalCell: { padding: 5, textAlign: "right", fontSize: 10 },
    tableFooter: { marginTop: 10, display: "flex", justifyContent: "flex-end" },
    summaryTable: { width: "40%", textAlign: "right", marginTop: 10 },
    totalAmountCell: { fontWeight: "bold", fontSize: 12 },
});
const invoiceProductsTransport: InvoiceProductTransport[] = [
    {
        date: new Date('2024-12-01'),
        vehicleNo: 'KA01AB1234',
        source: 'Mumbai',
        destination: 'Pune',
        price: 5000,
        cgst: 2,
        sgst: 2,
        amount: 5100,
    },
    {
        date: new Date('2024-12-02'),
        vehicleNo: 'MH12CD5678',
        source: 'Delhi',
        destination: 'Agra',
        price: 3000,
        cgst: 2,
        sgst: 2,
        amount: 3060,
    },
    {
        date: new Date('2024-12-05'),
        vehicleNo: 'KA03EF9012',
        source: 'Bangalore',
        destination: 'Chennai',
        price: 4000,
        cgst: 2,
        sgst: 2,
        amount: 4080,
    },
    {
        date: new Date('2024-12-10'),
        vehicleNo: 'TN09GH3456',
        source: 'Hyderabad',
        destination: 'Mumbai',
        price: 6000,
        cgst: 2,
        sgst: 2,
        amount: 6120,
    },
];

function PdfInvoiceProductsTableTransport() {
    // Format prices, CGST, SGST, and calculate amounts
    const invoiceProductsTransportMod = invoiceProductsTransport.map((product) => {
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
    const invoicesummary = calculateInvoiceSummaryForProductsTransport(invoiceProductsTransportMod);
    const { totalPrice, cgst, sgst, invoiceAmount } = invoicesummary;

    return (
        <View style={styles.section}>
            {/* Table header */}
            <View style={styles.tableHeader}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.headerCell, { width: "10%" }]}>Date</Text>
                    <Text style={[styles.headerCell, { width: "15%" }]}>Vehicle No</Text>
                    <Text style={[styles.headerCell, { width: "20%" }]}>Source</Text>
                    <Text style={[styles.headerCell, { width: "20%" }]}>Destination</Text>
                    <Text style={[styles.headerCell, { width: "15%" }]}>Price</Text>
                    <Text style={[styles.headerCell, { width: "10%", textAlign: "center" }]}>CGST</Text>
                    <Text style={[styles.headerCell, { width: "10%", textAlign: "center" }]}>SGST</Text>
                    <Text style={[styles.headerCell, { width: "20%", textAlign: "right" }]}>Amount</Text>
                </View>
            </View>

            {/* Table rows */}
            {invoiceProductsTransportMod.map((product, index) => (
                <View key={index} style={{ flexDirection: "row", borderBottom: "0.3px solid #ddd", }}>
                    <Text style={[styles.cell, { width: "10%" }]}>{formatDateDDMMYY(product.date.toLocaleDateString())}</Text>
                    <Text style={[styles.cell, { width: "15%" }]}>{product.vehicleNo}</Text>
                    <Text style={[styles.cell, { width: "20%" }]}>{product.source}</Text>
                    <Text style={[styles.cell, { width: "20%" }]}>{product.destination}</Text>
                    <Text style={[styles.cell, { width: "15%" }]}>{formatRupee(product.price)}</Text>
                    <Text style={[styles.cell, { width: "10%", textAlign: "center" }]}>{product.cgst}%</Text>
                    <Text style={[styles.cell, { width: "10%", textAlign: "center" }]}>{product.sgst}%</Text>
                    <Text style={[styles.cell, { width: "20%", textAlign: "right" }]}>{formatRupee(product.amount)}</Text>
                </View>
            ))}

            {/* Summary row */}
            <View style={{ flexDirection: "row", backgroundColor: "#f0f0f0" }}>
                <Text style={[styles.summaryCell, { width: "70%" }]}>
                    {invoiceAmount > 0 && (
                        <Text style={{ fontSize: 8 }}>
                            <Text style={{ fontWeight: "bold" }}>Rupees: </Text>
                            {numberToWordsIndian(Math.ceil(invoiceAmount))} Only.
                        </Text>
                    )}
                </Text>
                <Text style={[styles.totalCell, { width: "30%", fontSize: 10 }]}>Gross:</Text>
                <Text style={[styles.totalCell, { width: "20%", fontSize: 10, textAlign: "right" }]}>{formatCurrency(invoiceAmount)}</Text>
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
                        <Text style={[styles.summaryCell, styles.totalAmountCell]}>Total Amount</Text>
                        <Text style={[styles.totalCell, styles.totalAmountCell]}>{formatCurrency(invoiceAmount)}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export { PdfInvoiceProductsTableTransport };

