import mongoose, { InferSchemaType } from "mongoose";

const customersSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    GSTIN: { type: String },
    PAN : {type:String},
    address: {
        street: { type: String },
        city: { type: String },
        postalCode: { type: Number },
        state: { type: String }
    },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "business", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
}, { timestamps: true })

type Customers = InferSchemaType<typeof customersSchema>;
type CreateCustomers = Omit<Customers, 'createdAt' | 'updatedAt'>;

const CustomersModel = mongoose.model<Customers>("customers", customersSchema);

export { Customers, CustomersModel, CreateCustomers }