import { InvoiceProduct, InvoiceSummary } from "../types";

export const formatToTwoDecimalPlaces = (value: string | number): number => {
    const parsedValue = parseFloat(value.toString());
    return isNaN(parsedValue) ? 0 : parseFloat(parsedValue.toFixed(2));
};

export const calculateInvoiceSummaryForProductsTransport = (products: { price: string | number, cgst: string | number, sgst: string | number }[]) => {
    const totals = products.reduce((acc, product) => ({
        totalPrice: acc.totalPrice + Number(product.price),
        cgst: acc.cgst + (Number(product.price) * Number(product.cgst) / 100),
        sgst: acc.sgst + (Number(product.price) * Number(product.sgst) / 100)
    }), { totalPrice: 0, cgst: 0, sgst: 0 });

    return {
        ...totals,
        invoiceAmount: totals.totalPrice + totals.cgst + totals.sgst
    };
};


export const calculateInvoiceSummaryForProducts = (
    invoiceProducts: InvoiceProduct[]
): InvoiceSummary => {
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