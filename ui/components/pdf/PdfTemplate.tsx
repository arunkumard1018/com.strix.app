/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { PdfInvoiceProductsTable } from "./PdfProductsTable";
import { Invoice } from "../dashboard/invoices/types";
import { formatDateDDMMYY } from "@/lib/utils";

const styles = StyleSheet.create({
    page: { paddingHorizontal: 30, paddingVertical: 20 },
    section: { marginBottom: 10, width: "100%" },
    heading: { fontSize: 20, fontWeight: "extrabold", marginBottom: 3 },
    subHeading: { fontSize: 10, fontStyle: 'italic', color: "gray" },
    text: { fontSize: 12, marginBottom: 3 },
    textSm: { fontSize: 9, marginBottom: 2 },
    textMd: { fontSize: 10, marginBottom: 2 },
    flexRowBtw: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
    flexColBtw: { display: "flex", flexDirection: "column" },
    header: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    title: { fontSize: 18, color: "gray", fontWeight: "ultrabold" },
    hr: { borderBottom: "0.5px solid gray", padding: "2" },
    qrCode: {
        width: 50, height: 50,
    },
    invoiceDetail: { fontSize: 10, marginBottom: 2 },
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PdfTemplate = ({ invoiceData, qrCode }: { invoiceData: Invoice, qrCode: string }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={[styles.section]}>
                <View style={styles.header}>
                    <View style={styles.flexColBtw}>
                        <Text style={styles.heading} >{invoiceData.invoiceHeading.heading}</Text>
                        <Text style={styles.subHeading} >{invoiceData.invoiceHeading.subHeading}</Text>
                    </View>
                    <Text style={[styles.title, { fontWeight: "extrabold" }]}>{invoiceData.invoiceHeading.title}</Text>
                </View>
                <hr style={styles.hr} />
            </View>
            <View style={styles.section}>
                <View style={styles.flexRowBtw}>
                    <View>
                        <Text style={[styles.text, { fontSize: 10 }]}>From:</Text>
                        <Text style={[styles.textSm]}>{invoiceData.invoiceFrom.name}</Text>
                        <Text style={styles.textSm}>{invoiceData.invoiceFrom.address}</Text>
                        <Text style={styles.textSm}>
                            {invoiceData.invoiceFrom.city}, {invoiceData.invoiceFrom.state},{invoiceData.invoiceFrom.postalCode}
                        </Text>
                        <Text style={styles.textSm}>
                            {invoiceData.invoiceFrom.phone && `Phone: ${invoiceData.invoiceFrom.phone}`}
                        </Text>
                        <Text style={[styles.text, { fontSize: 10, marginTop: 10 }]}>To:</Text>
                        <Text style={[styles.textSm]}>{invoiceData.invoiceTo.name}</Text>
                        <Text style={styles.textSm}>{invoiceData.invoiceTo.address}</Text>
                        <Text style={styles.textSm}>
                            {invoiceData.invoiceTo.city}, {invoiceData.invoiceTo.state},{invoiceData.invoiceTo.postalCode}
                        </Text>
                        <Text style={styles.textSm}>
                            {invoiceData.invoiceTo.phone && `Phone: ${invoiceData.invoiceTo.phone}`}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.invoiceDetail}>
                            Invoice No: {invoiceData.invoiceDetails.invoicePrefix}{invoiceData.invoiceDetails.invoiceNo}
                        </Text>
                        <Text style={styles.invoiceDetail}>
                            Date: {formatDateDDMMYY(invoiceData.invoiceDetails.invoiceDate.toString())}
                        </Text>
                        {invoiceData.invoiceDetails.GSTIN && (
                            <Text style={styles.invoiceDetail}>GSTIN: {invoiceData.invoiceDetails.GSTIN}</Text>
                        )}
                        {invoiceData.invoiceDetails.PAN && (
                            <Text style={styles.invoiceDetail}>PAN: {invoiceData.invoiceDetails.PAN}</Text>
                        )}
                        {invoiceData.invoiceDetails.HSN && (
                            <Text style={styles.invoiceDetail}>HSN: {invoiceData.invoiceDetails.HSN}</Text>
                        )}
                        {invoiceData.invoiceDetails.stateCode && (
                            <Text style={styles.invoiceDetail}>State Code: {invoiceData.invoiceDetails.stateCode}</Text>
                        )}
                    </View>
                </View>
            </View>
            <PdfInvoiceProductsTable products={invoiceData.invoiceProducts} invoiceSummary={invoiceData.invoiceSummary} />
            <View style={[styles.section, { flexDirection: "row", justifyContent: "space-between" }]}>
                {invoiceData.bankDetails && invoiceData.bankDetails.accountNumber !== 0 && <View>
                    <Text style={[{ fontSize: 12, marginTop: 10, fontWeight: "extrabold", marginBottom: 2 }]}>Bank Details:</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{invoiceData.bankDetails.bankName && `Bank Name: ${invoiceData.bankDetails.bankName}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{invoiceData.bankDetails.accountName && `Account Name: ${invoiceData.bankDetails.accountName}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{invoiceData.bankDetails.accountNumber && `Account No: ${invoiceData.bankDetails.accountNumber}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{invoiceData.bankDetails.ifscCode && `IFSC Code: ${invoiceData.bankDetails.ifscCode}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{invoiceData.bankDetails.branch && `Branch: ${invoiceData.bankDetails.branch}`}</Text>
                </View>}
                <View style={{ alignItems: invoiceData.bankDetails && invoiceData.bankDetails.accountNumber !== 0 ? "flex-end" : "flex-start", justifyContent: "flex-end" }}>
                    <Image src={qrCode} style={styles.qrCode} />
                    <Text style={{ fontSize: 9, marginTop: 4, }}>{invoiceData.additionalInfo.thankyouNote && `Thank you for youre Business!`}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default PdfTemplate;
