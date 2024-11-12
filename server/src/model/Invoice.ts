import { required } from "joi";
import mongoose, { InferSchemaType } from "mongoose";

// Define sub-schema for TransportInvoiceDetails
const TransportInvoiceDetailsSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true },
    source: { type: String },
    destination: { type: String },
    amount: { type: Number }
});

// Define sub-schema for ProductInvoiceDetails
const ProductInvoiceDetailsSchema = new mongoose.Schema({
    sku: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true }
});
type TransportDetails = InferSchemaType<typeof TransportInvoiceDetailsSchema>;
type ProductDetails = InferSchemaType<typeof ProductInvoiceDetailsSchema>;


const invoiceSchema = new mongoose.Schema({
    invoiceNo: { type: String, required: true },
    invoiceDate: { type: Date, required: true },
    invoiceBy: {
        name: { type: String, required: true },
        GSTIN: { type: String },
        HSN: { type: Number },
        stateCode: { type: Number },
        PAN: { type: String },
        phone: {type:Number, required:true},
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: Number, required: true },
            state: { type: String, required: true }
        }
    },
    invoiceTo: {
        name: { type: String, required: true },
        GSTIN: { type: String },
        HSN: { type: Number },
        stateCode: { type: Number },
        PAN: { type: String },
        phone: { type: Number , required:true},
        email: { type: String },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: Number, required: true },
            state: { type: String, required: true }
        }
    },

    /**Custom Validator For Invoice Details */
    invoiceDetails: {
        type: [mongoose.Schema.Types.Mixed],  // Allow either array structure
        required: true,
        validate: {
            validator: function (value: Array<TransportDetails | ProductDetails>) {
                // Ensure only one type of structure is present in the array
                return (
                    value.every((item) => 'vehicleNo' in item) ||
                    value.every((item) => 'sku' in item)
                );
            },
            message: 'invoiceDetails should contain either only Transport or Product details.',
        },
    },

    totalAmount: { type: Number, required: true },
    CGST: { type: Number },
    SGST: { type: Number },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "business", required: true },
    customers: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
}, { timestamps: true })


type Invoice = InferSchemaType<typeof invoiceSchema>;
type CreateInvoice = Omit<Invoice, 'createdAt' | 'updatedAt'>;
const InvoiceModel = mongoose.model<Invoice>("invoices", invoiceSchema);

export { CreateInvoice, Invoice, InvoiceModel };
