import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { PdfInvoiceProductsTableTransport } from "./PdfTransportProductTable";

const styles = StyleSheet.create({
    page: { padding: 40 },
    section: { marginBottom: 10, width: "100%" },
    heading: { fontSize: 20, fontWeight: "bold", },
    subHeading: { fontSize: 10 },
    text: { fontSize: 12, marginBottom: 3 },
    textSm: { fontSize: 8, marginBottom: 2 },
    textMd: { fontSize: 10, marginBottom: 2 },
    flexRowBtw: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
    flexColBtw: { display: "flex", flexDirection: "column" },
    header: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    title: { fontSize: 18, color: "gray", fontWeight: "ultrabold" },
    hr: { borderBottom: "0.5px solid gray", padding: "2" },
});
const data = "";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PdfTemplate = ({ invoiceData }: { invoiceData: any }) => (
    <Document>
        <Page style={styles.page}>
            <View style={[styles.section]}>
                <div style={styles.header}>
                    <div style={styles.flexColBtw}>
                        <Text style={styles.heading} >AB Eneterprises</Text>
                        <Text style={styles.subHeading} >Transport Service</Text>
                    </div>
                    <Text style={styles.title}>TAX INVOICE</Text>
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
                        <Text style={[styles.text, { fontSize: 10 }]}>To:</Text>
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
            {/* To */}
            <View style={styles.section}>
            </View>
            <PdfInvoiceProductsTableTransport/>
            <View style={styles.section}>
                <Text style={styles.text}>Total: ${invoiceData.invoicesummary.invoiceAmount}</Text>
            </View>
        </Page>
    </Document>
);

export default PdfTemplate;
