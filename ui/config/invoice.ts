import { InvoiceConfig, InvoiceFormData } from "@/components/dashboard/invoices/form-data";

export const invoiceConfig: InvoiceConfig = {
    invoiceHeading: {
        heading: "Heading",
        subHeading: "Sub Heading",
        title: "TAX INVOICE"
    },
    invoiceFrom: {
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: ""
    },
    invoiceDetails: {
        invoicePrefix: "INV",
        invoiceNo: "1",
        GSTIN: "",
        PAN: "",
        HSN: "",
        stateCode: ""
    },
    additionalInfo: {
        thankyouNote: "Thank You For Your Business!",
        isBankDetails: true,
        isTransportInvoice: false,
        paymentMethod: "Cash",
        paymentStatus: "Processing"

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
    customers:"",
    invoiceDetails: {
        ...invoiceConfig.invoiceDetails,
        invoiceDate: new Date(),
        dueDate: new Date(),
    },
    invoiceTo: {
        name: "",
        address: "",
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
            price: "",
            qty: "",
            cgst: "",
            sgst: "",
            amount: ""
        }
    ],
    invoiceProductsTransport: [
        {
            date: new Date(),
            vehicleNo: "",
            source: "",
            destination: "",
            price: "",
            cgst: "",
            sgst: "",
            amount: "",
        }
    ],
    invoiceSummary: {
        totalPrice: 0,
        cgst: 0,
        sgst: 0,
        invoiceAmount: 0,
    },
};