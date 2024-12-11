/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { PdfInvoiceProductsTable } from "./PdfProductsTable";

const styles = StyleSheet.create({
    page: { padding: 40 },
    section: { marginBottom: 10, width: "100%" },
    heading: { fontSize: 20, fontWeight: "bold", },
    subHeading: { fontSize: 10, fontStyle: 'italic', },
    text: { fontSize: 12, marginBottom: 3 },
    textSm: { fontSize: 8, marginBottom: 2 },
    textMd: { fontSize: 10, marginBottom: 2 },
    flexRowBtw: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
    flexColBtw: { display: "flex", flexDirection: "column" },
    header: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    title: { fontSize: 18, color: "gray", fontWeight: "ultrabold" },
    hr: { borderBottom: "0.5px solid gray", padding: "2" },
    qrCode: {
        width: 50, height: 50,
    },
});
const data = "hello";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PdfTemplate = ({ invoiceData, qrCode }: { invoiceData: any, qrCode: string }) => (
    <Document>
        <Page style={styles.page}>
            <View style={[styles.section]}>
                <div style={styles.header}>
                    <div style={styles.flexColBtw}>
                        <Text style={styles.heading} >AB Eneterprises</Text>
                        <Text style={styles.subHeading} >Transport Service</Text>
                    </div>
                    <Text style={[styles.title, { fontWeight: "extrabold" }]}>TAX INVOICE</Text>
                </div>
                <hr style={styles.hr} />
            </View>
            <View style={styles.section}>
                <div style={styles.flexRowBtw}>
                    <div>
                        <Text style={[styles.text, { fontSize: 10 }]}>From:</Text>
                        <Text style={[styles.textSm]}>{invoiceData.invoiceFrom.name}</Text>
                        <Text style={styles.textSm}>{invoiceData.invoiceFrom.street}</Text>
                        <Text style={styles.textSm}>
                            {invoiceData.invoiceFrom.city}, {invoiceData.invoiceFrom.state},{577002}
                        </Text>
                        <Text style={styles.textSm}>
                            {data && `Phone: ${7584585258}`}
                        </Text>
                        <Text style={[styles.text, { fontSize: 10, marginTop: 10 }]}>To:</Text>
                        <Text style={[styles.textSm]}>{invoiceData.invoiceFrom.name}</Text>
                        <Text style={styles.textSm}>{invoiceData.invoiceFrom.street}</Text>
                        <Text style={styles.textSm}>
                            {invoiceData.invoiceFrom.city}, {invoiceData.invoiceFrom.state},{577002}
                        </Text>
                        <Text style={styles.textSm}>
                            {data && `Phone: ${7584585258}`}
                        </Text>
                    </div>
                    <div >
                        <Text style={[styles.textMd, { marginBottom: 3 }]}>INVOICE NO: INV-1005 </Text>
                        <Text style={[styles.textMd, { marginBottom: 3 }]}>DATE: 22-12-2024</Text>
                        <Text style={[styles.textMd, { marginBottom: 3 }]}>GSTIN: HGAF544FS</Text>
                        <Text style={[styles.textMd, { marginBottom: 3 }]}>PAN: HGAF544FS</Text>
                        <Text style={[styles.textMd, { marginBottom: 3 }]}>HSN: 255</Text>
                        <Text style={[styles.textMd, { marginBottom: 3 }]}>StateCode: 85</Text>
                    </div>
                </div>
            </View>
            <PdfInvoiceProductsTable />
            <View style={[styles.section, { flexDirection: "row", justifyContent: "space-between" }]}>
                <div>
                    <Text style={[styles.text, { fontSize: 10, marginTop: 10, fontWeight: "bold" }]}>Bank Details</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{data && `Account Name: ${"GM Logistics"}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{data && `Bank: ${"AMX Bank"}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{data && `Account No: ${"45858555855"}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{data && `IFSC Code: ${"IHG56GG"}`}</Text>
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>{data && `Branch: ${"MG Road Banglore"}`}</Text>
                </div>
                <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <Image src={qrCode} style={styles.qrCode} />
                    <Text style={{ fontSize: 9, marginTop: 4, }}>{data && `Thank you for youre Business!`}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default PdfTemplate;
