import mongoose, { InferSchemaType } from "mongoose";

const InvoicePrefixSchema = new mongoose.Schema(
    {
        prefix: { type: String, required: true },
        count: { type: Number, required: true, default: 0 }
    },
    { _id: false }
);

interface InvoicePrefix {
    prefix: string;
    count: number;
}

const businessSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        catagory: {
            type: String,
            enum: ["Transport", "Retail", "Enterprise"],
            required: true
        },
        city: { type: String, required: true },
        invoicePrefixes: { type: [InvoicePrefixSchema], default: [], _id: false },
        phone: { type: Number, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
    },
    { timestamps: true }
);

type Business = InferSchemaType<typeof businessSchema>;
type CreateBusiness = Omit<Business, 'createdAt' | 'updatedAt'>;

const businessModel = mongoose.model<Business>("business", businessSchema);

export { Business, businessModel, CreateBusiness };
