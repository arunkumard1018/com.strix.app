import Joi from "joi";
import { InvoiceProducts, InvoiceProductsTransport } from "../model/Invoice";

// Joi schemas for sub-documents
const InvoiceProductsTransportSchema = Joi.object({
    date: Joi.date().required(),
    vehicleNo: Joi.string().required(),
    source: Joi.string().required(),
    destination: Joi.string().required(),
    price: Joi.number().required(),
    cgst: Joi.number().required(),
    sgst: Joi.number().required(),
    amount: Joi.number().required(),
});


const InvoiceProductsSchema = Joi.object({
    sku: Joi.string().allow(''),
    description: Joi.string().required(),
    price: Joi.number().required(),
    qty: Joi.number().required(),
    cgst: Joi.number().required(),
    sgst: Joi.number().required(),
    amount: Joi.number().required(),
});

const InvoiceHeadingSchema = Joi.object({
    heading: Joi.string().required(),
    subHeading: Joi.string().default(""),
    title: Joi.string().default(""),
});

const InvoiceFromSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.number().required(),
    phone: Joi.number(),
    email: Joi.string().email(),
});

const InvoiceToSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.number().required(),
    phone: Joi.number().optional(),
    email: Joi.string().email().optional().allow(''),
    GSTIN: Joi.string().optional().allow(''),
    PAN: Joi.string().optional().allow(''),
});

const InvoiceDetailsSchema = Joi.object({
    invoicePrefix: Joi.string().required(),
    invoiceNo: Joi.number().required(),
    invoiceDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    GSTIN: Joi.string().allow('').optional(),
    PAN: Joi.string().allow('').optional(),
    HSN: Joi.number().optional(),
    stateCode: Joi.number().optional(),
});

const BankDetailsSchema = Joi.object({
    bankName: Joi.string().allow(''),
    accountName: Joi.string().allow(''),
    accountNumber: Joi.number(),
    ifscCode: Joi.string().allow(''),
    branch: Joi.string().allow(''),
});

const AdditionlInfoSchema = Joi.object({
    thankyouNote: Joi.string().default(""),
    isBankDetails: Joi.boolean().required(),
    isTransportInvoice: Joi.boolean().required(),
    paymentStatus: Joi.string()
        .valid("Paid", "Processing", "Due")
        .required(),
    paymentMethod: Joi.string()
        .valid("Cash", "UPI", "BankTransfer", "CardPayment")
        .required(),
});

const InvoiceSummarySchema = Joi.object({
    totalPrice: Joi.number().required(),
    cgst: Joi.number().required(),
    sgst: Joi.number().required(),
    invoiceAmount: Joi.number().required(),
});

// Joi schema for the main Invoice schema
const InvoiceSchema = Joi.object({
    invoiceHeading: InvoiceHeadingSchema.required(),
    invoiceFrom: InvoiceFromSchema.required(),
    invoiceTo: InvoiceToSchema.required(),
    invoiceDetails: InvoiceDetailsSchema.required(),
    invoiceProducts: Joi.array()
        .items(Joi.alternatives().try(InvoiceProductsTransportSchema, InvoiceProductsSchema))
        .required()
        .custom((value, helpers) => {
            // Validate that all items in the array are of one type
            const isTransport = value.every((item: InvoiceProductsTransport) => "vehicleNo" in item);
            const isProduct = value.every((item: InvoiceProducts) => "description" in item);
            if (!isTransport && !isProduct) {
                return helpers.error("invoiceProducts.mixedType", {
                    message: "invoiceProducts should contain either only Transport or only Product details."
                });
            }
            return value;
        }),
    bankDetails: BankDetailsSchema.required(),
    additionalInfo: AdditionlInfoSchema.required(),
    invoiceSummary: InvoiceSummarySchema.required(),
    customers: Joi.string().optional().allow(""),
}).required();


export { InvoiceSchema };
