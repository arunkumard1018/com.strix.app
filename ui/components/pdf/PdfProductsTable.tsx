import { formatCurrency, formatRupee, numberToWordsIndian } from "@/lib/utils"; // Make sure these functions work with PDF renderer
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { calculateInvoiceSummaryForProductsTransport, formatToTwoDecimalPlaces } from "../dashboard/invoices/invoice-template/form-components/calculations";
import { InvoiceProductTransport } from "../dashboard/invoices/types";

// Register Noto Sans from Google Fonts
Font.register({
    family: 'Noto Sans',
    fonts: [
        {
            src: './components/pdf/NotoSans-Bold.ttf',
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
        date: new Date('2024-12-10'),
        vehicleNo: 'TN09GH3456',
        source: 'Hyderabad',
        destination: 'Mumbai',
        price: 6000,
        cgst: 2,
        sgst: 2,
        amount: 6120,
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

const dummyInvoiceProducts = [
    {
        description: "Laptop",
        price: 50000,
        qty: 2,
        cgst: 9,
        sgst: 9,
        amount: 118000,
    },
    {
        description: "Smartphone",
        price: 20000,
        qty: 3,
        cgst: 12,
        sgst: 12,
        amount: 67200,
    },
    {
        description: "Tablet",
        price: 15000,
        qty: 1,
        cgst: 5,
        sgst: 5,
        amount: 16500,
    },
];

function PdfInvoiceProductsTable() {
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
                    <Text style={[styles.headerCell, { width: "45%" }]}>Description</Text>
                    <Text style={[styles.headerCell, { width: "15%" }]}>Price</Text>
                    <Text style={[styles.headerCell, { width: "9%" }]}>Qty</Text>
                    <Text style={[styles.headerCell, { width: "8%", textAlign: "center" }]}>SGST</Text>
                    <Text style={[styles.headerCell, { width: "8%", textAlign: "center" }]}>CGST</Text>
                    <Text style={[styles.headerCell, { width: "15%", textAlign: "right" }]}>Amount</Text>
                </View>
            </View>

            {/* Table rows */}
            {dummyInvoiceProducts.map((product, index) => (
                <View key={index} style={{ flexDirection: "row", }}>
                    <Text style={[styles.cell, { width: "45%" }]}>{product.description}</Text>
                    <Text style={[styles.cell, { width: "15%" }]}>{formatRupee(product.price)}</Text>
                    <Text style={[styles.cell, { width: "9%" }]}>{formatRupee(product.qty)}</Text>
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

