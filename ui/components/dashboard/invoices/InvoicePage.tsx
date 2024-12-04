import React, { forwardRef } from "react";
import { FormikProps } from "formik";
import { TabsContent } from "@radix-ui/react-tabs";
import { useSelector } from "react-redux";
import { InvoiceFormData } from "./types";
import { RootState } from "@/store/store";
import { InvoiceFooter, InvoiceHeading, InvoiceInfo } from "./invoice-template/invoice-header";
import { InvoiceProductsTableTransport } from "./invoice-template/InvoiceProductsTableTransport";
import InvoiceProductsTable from "./invoice-template/invoiceProductsTable";

const InvoicePage = forwardRef<HTMLDivElement, { formik: FormikProps<InvoiceFormData> }>(
    ({ formik }, ref) => {
        const globalState = useSelector((state: RootState) => state);
        const activeBusiness = globalState.authContext.activeBusiness;

        return (
            <TabsContent
                value="Preview"
                className="border p-2 md:p-20 bg-background"
                id="preview"
            >
                <div ref={ref} id="invoice" className="bg-background w-full space-y-5">
                    <InvoiceHeading
                        businessName={formik.values.inoviceheading.heading}
                        buisnessType={formik.values.inoviceheading.subHeading}
                        invoiceTitle={formik.values.inoviceheading.title}
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
);

export { InvoicePage };
