import mongoose, { InferSchemaType } from "mongoose";

const invoiceConfigSchema = new mongoose.Schema({
    invoiceHeading: {
        heading: { type: String },
        subHeading: { type: String },
        title: { type: String },
    },
    invoiceFrom: {
        name: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: Number },
        phone: { type: Number },
        email: { type: String },
    },
    invoiceDetails: {
        invoicePrefix: { type: String },
        invoiceNo: { type: Number },
        GSTIN: { type: String },
        PAN: { type: String },
        HSN: { type: Number },
        stateCode: { type: Number },
    },
    bankDetails: {
        bankName: { type: String },
        accountName: { type: String },
        accountNumber: { type: Number },
        ifscCode: { type: String },
        branch: { type: String },
    },
    additionalInfo: {
        thankyouNote: { type: String },
        isBankDetails: { type: Boolean },
        isTransportInvoice: { type: Boolean },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "business", required: true },
}, { timestamps: true })

type InvoiceConfig = InferSchemaType<typeof invoiceConfigSchema>;
type CreateInvoiceConfig = Omit<InvoiceConfig, 'createdAt' | 'updatedAt'>;

/** InvoiceConfig Model */
const InvoiceConfigModel = mongoose.model<InvoiceConfig>("invoiceConfig", invoiceConfigSchema);

export { InvoiceConfig, InvoiceConfigModel, CreateInvoiceConfig };

