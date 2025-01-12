import mongoose from "mongoose";
import { DuplicateInvoiceNumberError } from "../errors";
import { InvoiceModel } from "../model/Invoice";
import { InvoiceConfig } from "../model/InvoiceConfig";

export const validateInvoiceNumber = async (
    invoiceNo: number,
    prefix: string,
    businessId: mongoose.Types.ObjectId,
    session: mongoose.ClientSession,
    currentInvoiceId?: mongoose.Types.ObjectId
) => {
    const query: any = {
        'invoiceDetails.invoicePrefix': prefix,
        'invoiceDetails.invoiceNo': invoiceNo,
        business: businessId
    };

    // If updating existing invoice, exclude it from duplicate check
    if (currentInvoiceId) {
        query._id = { $ne: currentInvoiceId };
    }

    const existingInvoice = await InvoiceModel.findOne(query).session(session);

    if (existingInvoice) {
        throw new DuplicateInvoiceNumberError(
            `Invoice number ${prefix}${invoiceNo} already exists`
        );
    }
};

export function validateInvoiceConfig(config: InvoiceConfig | null): asserts config is InvoiceConfig & { invoiceDetails: NonNullable<InvoiceConfig['invoiceDetails']> } {
    if (!config || !config.invoiceDetails?.invoiceNo || !config.invoiceDetails?.invoicePrefix) {
        throw new Error("Invalid invoice configuration: missing required fields");
    }
} 