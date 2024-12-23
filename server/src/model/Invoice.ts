import mongoose, { InferSchemaType } from "mongoose";

// Define sub-schema for TransportInvoiceDetails
const InvoiceProductsTransportSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    vehicleNo: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    amount: { type: Number, required: true },
}, { _id: false });

// Define sub-schema for ProductInvoiceDetails
const InvoiceProductsSchema = new mongoose.Schema({
    sku: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    amount: { type: Number, required: true },
}, { _id: false });

const InvoiceHeadingSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, default: "" },
    title: { type: String, default: "" },
}, { _id: false });

const InvoiceFromSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true },
    phone: { type: Number },
    email: { type: String },
}, { _id: false });

const InvoiceToSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true },
    phone: { type: Number },
    email: { type: String },
    GSTIN: { type: String, default: "" },
    PAN: { type: String, default: "" },
}, { _id: false });

const InvoiceDetailsSchema = new mongoose.Schema({
    invoicePrefix: { type: String, required: true },
    invoiceNo: { type: Number, required: true },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    GSTIN: { type: String, default: "" },
    PAN: { type: String, default: "" },
    HSN: { type: Number },
    stateCode: { type: Number },
}, { _id: false });

const BankDetailsSchema = new mongoose.Schema({
    bankName: { type: String, default: "" },
    accountName: { type: String, default: "" },
    accountNumber: { type: Number },
    ifscCode: { type: String, default: "" },
    branch: { type: String, default: "" },
}, { _id: false });

const AdditionlInfoSchema = new mongoose.Schema({
    thankyouNote: { type: String, default: "" },
    isBankDetails: { type: Boolean, required: true },
    isTransportInvoice: { type: Boolean, required: true },
    paymentStatus: { type: String, enum: ["Paid", "Processing", "Due"], required: true },
    paymentMethod: { type: String, enum: ["Cash", "UPI", "BankTransfer", "CardPayment"], required: true },
}, { _id: false });

const InvoiceSummarySchema = new mongoose.Schema({
    totalPrice: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    invoiceAmount: { type: Number, required: true },
});

// Infer types for transport and product schemas
type InvoiceProductsTransport = InferSchemaType<typeof InvoiceProductsTransportSchema>;
type InvoiceProducts = InferSchemaType<typeof InvoiceProductsSchema>;

// Define the main schema with a custom validator for invoiceDetails
const InvoiceSchema = new mongoose.Schema({
    invoiceHeading: InvoiceHeadingSchema,
    invoiceFrom: InvoiceFromSchema,
    invoiceTo: InvoiceToSchema,
    invoiceDetails: InvoiceDetailsSchema,
    invoiceProducts: {
        type: [mongoose.Schema.Types.Mixed], // Allow mixed structure
        required: true,
        validate: {
            validator: function (value: Array<InvoiceProductsTransport | InvoiceProducts>) {
                // Check if all items are of one type
                const isTransport = value.every(item => 'vehicleNo' in item);
                const isProduct = value.every(item => 'sku' in item);

                // Only one type should exist
                return isTransport || isProduct;
            },
            message: 'invoiceDetails should contain either only Transport or only Product details.',
        },
    },
    bankDetails: BankDetailsSchema,
    additionlInfo: AdditionlInfoSchema,
    invoicesummary: InvoiceSummarySchema,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "business", required: true },
    customers: { type: mongoose.Schema.Types.ObjectId, ref: "customers", },
}, { timestamps: true });

// Export model and types
type Invoice = InferSchemaType<typeof InvoiceSchema>;
const InvoiceModel = mongoose.model<Invoice>("invoice", InvoiceSchema);

export { InvoiceProductsTransport, InvoiceProducts, Invoice, InvoiceModel };
