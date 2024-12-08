import { RootState } from "@/store/store";
import { TabsContent } from "@radix-ui/react-tabs";
import { FormikProps } from "formik";
import { useSelector } from "react-redux";
import { InvoiceFooter, InvoiceHeading, InvoiceInfo } from "./invoice-template/invoice-header";
import InvoiceProductsTable from "./invoice-template/invoiceProductsTable";
import { InvoiceProductsTableTransport } from "./invoice-template/InvoiceProductsTableTransport";
import { InvoiceFormData } from "./types";

const InvoicePage = ({ formik }: { formik: FormikProps<InvoiceFormData> }) => {
    const activeBusiness = useSelector((state: RootState) => state.authContext.activeBusiness);
    return (
        <TabsContent
            value="Preview"
            className="border p-2 md:p-20 bg-background my-2"
            id="preview"
        >
            <div id="invoice" className="bg-background w-full space-y-5">
                <InvoiceHeading
                    businessName={formik.values.invoiceHeading.heading}
                    buisnessType={formik.values.invoiceHeading.subHeading}
                    invoiceTitle={formik.values.invoiceHeading.title}
                />
                <InvoiceInfo
                    invoiceFrom={formik.values.invoiceFrom}
                    invoiceTo={formik.values.invoiceTo}
                    invoiceDetails={formik.values.invoiceDetails}
                />
                <div className="flex justify-between w-full">
                    {activeBusiness.catagory === "Transport" ? (
                        <InvoiceProductsTableTransport invoiceConfig={formik.values} />
                    ) : (
                        <InvoiceProductsTable invoiceConfig={formik.values} />
                    )}
                </div>
                <InvoiceFooter
                    isBankDetails={formik.values.additionlInfo.isBankDetails}
                    bankDetails={formik.values.bankDetails}
                    thankYouMessage={formik.values.additionlInfo.thankyouNote}
                />
            </div>
        </TabsContent>
    );
}


export { InvoicePage };

