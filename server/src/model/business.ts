import mongoose, { InferSchemaType } from "mongoose";

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    email: { type: String },
    logo: { type: String },
    catagory: { 
        type: String, 
        enum: ["Transport", "Retail", "Enterprise"],
        required: true 
    },
    GSTIN :{type:String},
    HSN :{type:Number},
    stateCode : {type:Number},
    address: {
        street: { type: String },
        city: { type: String },
        postalCode : { type: Number },
        state: { type: String }
    }

}, { timestamps: true })

type Business = InferSchemaType<typeof businessSchema>;
type CreateBusiness = Omit<Business, 'createdAt' | 'updatedAt'>;

/** Business Model */
const businessModel = mongoose.model<Business>("business", businessSchema);

export { Business, businessModel, CreateBusiness };

