import { InvoiceConfig, InvoiceFormData } from "@/components/dashboard/invoices/types";

export const invoiceConfig: InvoiceConfig = {
    inoviceheading: {
        heading: "StrixInvoice",
        subHeading: "Reatil Service",
        title: "TAX INVOICE"
    },
    invoiceFrom: {
        street: "#122Church Hill Street",
        street2: "Near Richmond Circle",
        city: "Banglore",
        state: "Karnataka",
        postalCode: "577001",
        phone: "+91 98758 78558"
    },
    invoiceDetails: {
        invoicePrefix: "INV/YT",
        invoiceNo: "001",
        invoiceDate: new Date().toString(),
        GSTIN: "ABCD458GF4",
        PAN: "NAG458FD5F5",
        HSN: "222",
        stateCode: "333"
    },
    additionlInfo: {
        thankyouNote: "Thank You For Your Business!",
        isBankDetails: true,
    },
    bankDetails: {
        bankName: 'HDFC Bank',
        accountName: 'ABC Logistics Pvt Ltd',
        accountNumber: '123456789012',
        ifscCode: 'HDFC0001234',
        branch: 'Bangalore Main Branch',
    }
}

export const invoiceFormInitialData: InvoiceFormData = {
    ...invoiceConfig,
    invoiceTo: {
        street: "#128 GEM Road",
        street2: "MG Complex 5d ",
        city: "Manglore",
        state: "Karnataka",
        postalCode: "577002",
        phone: "+91 55477 78747",
        GSTIN: "ABCF54FD77",
        PAN: "GFFG765FFFJ"
    },
    invoiceProducts: [
        {
            sku: "",
            description: "",
            price: 0,
            qty: 1,
            cgst: 0,
            sgst: 0,
            amount: 0
        }
    ],
    invoiceProductsTransport: [
        {
            date: new Date(),
            vehicleNo: "",
            source: "",
            destination: "",
            price: 0,
            cgst: 0,
            sgst: 0,
            amount: 0,
        }
    ],
    invoicesummary: {
        totalPrice: 0,
        cgst: 0,
        sgst: 0,
        invoiceAmount: 0,
    },
};