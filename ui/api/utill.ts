import { Invoice, InvoiceSummary } from "@/components/dashboard/invoices/types";

export const calculateSummary = (invoiceData: Invoice):InvoiceSummary => {
    // Format number to 2 decimal places
    const formatToTwoDecimalPlaces = (num: number): number => {
        return Number(Number(num).toFixed(2));
    };

    if (invoiceData.additionalInfo.isTransportInvoice) {
        const totals = invoiceData.invoiceProducts.reduce((acc, product) => {
            const price = Number(product.price);
            const cgst = (price * Number(product.cgst)) / 100;
            const sgst = (price * Number(product.sgst)) / 100;
            return {
                invoiceAmount: acc.invoiceAmount + price + cgst + sgst,
                cgst: acc.cgst + cgst,
                sgst: acc.sgst + sgst,
                totalPrice: acc.totalPrice + price
            };
        }, {
            invoiceAmount: 0,
            cgst: 0,
            sgst: 0,
            totalPrice: 0
        });

        return {
            invoiceAmount: formatToTwoDecimalPlaces(totals.invoiceAmount),
            cgst: formatToTwoDecimalPlaces(totals.cgst),
            sgst: formatToTwoDecimalPlaces(totals.sgst),
            totalPrice: formatToTwoDecimalPlaces(totals.totalPrice)
        };
    } else {
        const totals = invoiceData.invoiceProducts.reduce((acc, product) => {
            const baseAmount = Number(product.price) * ('qty' in product ? Number(product.qty) : 1);
            const cgst = (baseAmount * Number(product.cgst)) / 100;
            const sgst = (baseAmount * Number(product.sgst)) / 100;

            return {
                invoiceAmount: acc.invoiceAmount + baseAmount + cgst + sgst,
                cgst: acc.cgst + cgst,
                sgst: acc.sgst + sgst,
                totalPrice: acc.totalPrice + baseAmount
            };
        }, {
            invoiceAmount: 0,
            cgst: 0,
            sgst: 0,
            totalPrice: 0
        });

        return {
            invoiceAmount: formatToTwoDecimalPlaces(totals.invoiceAmount),
            cgst: formatToTwoDecimalPlaces(totals.cgst),
            sgst: formatToTwoDecimalPlaces(totals.sgst),
            totalPrice: formatToTwoDecimalPlaces(totals.totalPrice)
        };
    }
};
