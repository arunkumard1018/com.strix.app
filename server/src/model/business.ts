import mongoose, { InferSchemaType } from "mongoose";

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String },
    catagory: { 
        type: String, 
        enum: ["Transport", "Retail", "Enterprise"],
        required: true 
    },
    city: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
}, { timestamps: true })

type Business = InferSchemaType<typeof businessSchema>;
type CreateBusiness = Omit<Business, 'createdAt' | 'updatedAt'>;

/** Business Model */
const businessModel = mongoose.model<Business>("business", businessSchema);

export { Business, businessModel, CreateBusiness };

