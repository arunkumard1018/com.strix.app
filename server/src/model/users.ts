import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    picture: {type:String},
    googleId: {type:Number},
    business: [{ type: mongoose.Schema.Types.ObjectId, ref: "business" }],
}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;
type CreateUser = Omit<User, 'createdAt' | 'updatedAt' | "business">;
// Users Model
const userModel = mongoose.model<User>("users", userSchema);

export { CreateUser, User, userModel };

