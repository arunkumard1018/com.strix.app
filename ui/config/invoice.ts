import { InvoiceConfig, InvoiceFormData } from "@/components/dashboard/invoices/types";

export const invoiceConfig: InvoiceConfig = {
    invoiceHeading: {
        heading: "Heading 1",
        subHeading: "",
        title: ""
    },
    invoiceFrom: {
        name: "Strix Invoices",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        phone: ""
    },
    invoiceDetails: {
        invoicePrefix: "INV",
        invoiceNo: "1",
        invoiceDate: new Date(),
        GSTIN: "",
        PAN: "",
        HSN: "",
        stateCode: ""
    },
    additionlInfo: {
        thankyouNote: "Thank You For Your Business!",
        isBankDetails: true,
    },
    bankDetails: {
        bankName: '',
        accountName: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
    }
}

export const invoiceFormInitialData: InvoiceFormData = {
    ...invoiceConfig,
    invoiceTo: {
        name: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        GSTIN: "",
        PAN: ""
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