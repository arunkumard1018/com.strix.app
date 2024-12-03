import { InvoiceProduct, InvoiceProductTransport, Invoicesummary } from "../../types";

export const formatToTwoDecimalPlaces = (value: string | number): number => {
    const parsedValue = parseFloat(value.toString());
    return isNaN(parsedValue) ? 0 : parseFloat(parsedValue.toFixed(2));
};

export const calculateInvoiceSummaryForProductsTransport = (
    invoiceProductsTransport: InvoiceProductTransport[]
): Invoicesummary => {
    const summary = invoiceProductsTransport.reduce(
        (acc, product) => {
            const cgstAmount = (product.price * product.cgst) / 100;
            const sgstAmount = (product.price * product.sgst) / 100;
            const totalAmount = product.price + cgstAmount + sgstAmount;
            return {
                totalPrice: acc.totalPrice + product.price,
                cgst: acc.cgst + cgstAmount,
                sgst: acc.sgst + sgstAmount,
                invoiceAmount: acc.invoiceAmount + totalAmount,
            };
        },
        {
            totalPrice: 0,
            cgst: 0,
            sgst: 0,
            invoiceAmount: 0,
        }
    );

    // Return the summary with values rounded to 2 decimal places
    return {
        totalPrice: formatToTwoDecimalPlaces(summary.totalPrice),
        cgst: formatToTwoDecimalPlaces(summary.cgst),
        sgst: formatToTwoDecimalPlaces(summary.sgst),
        invoiceAmount: formatToTwoDecimalPlaces(summary.invoiceAmount),
    };
};
export const calculateInvoiceSummaryForProducts = (
    invoiceProducts: InvoiceProduct[]
): Invoicesummary => {
    const summary = invoiceProducts.reduce(
        (acc, product) => {
            const cgstAmount = (product.price * product.cgst) / 100;
            const sgstAmount = (product.price * product.sgst) / 100;
            const totalAmount = product.price + cgstAmount + sgstAmount;
            return {
                totalPrice: acc.totalPrice + product.price,
                cgst: acc.cgst + cgstAmount,
                sgst: acc.sgst + sgstAmount,
                invoiceAmount: acc.invoiceAmount + totalAmount,
            };
        },
        {
            totalPrice: 0,
            cgst: 0,
            sgst: 0,
            invoiceAmount: 0,
        }
    );
    // Return the summary with values rounded to 2 decimal places
    return {
        totalPrice: formatToTwoDecimalPlaces(summary.totalPrice),
        cgst: formatToTwoDecimalPlaces(summary.cgst),
        sgst: formatToTwoDecimalPlaces(summary.sgst),
        invoiceAmount: formatToTwoDecimalPlaces(summary.invoiceAmount),
    };
};