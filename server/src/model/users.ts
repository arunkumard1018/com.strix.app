import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
}, { timestamps: true })

type User = InferSchemaType<typeof userSchema>;
type CreateUser = Omit<User, 'createdAt' | 'updatedAt'>;
// Users Model
const userModel = mongoose.model<User>("users", userSchema);

export  {User,userModel};
