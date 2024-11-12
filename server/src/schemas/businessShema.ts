import Joi from "joi";
import { addressSchema } from "./addressSchema";


const businessSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.empty": "Name is required",
    }),
    email: Joi.string().email().optional().messages({
        "string.email": "Please enter a valid email address",
    }),
    // phone: Joi.number().integer().required(),
    logo: Joi.string().optional(),
    // invoicePrefix:Joi.string().required(),
    catagory: Joi.string().valid("Transport", "Retail", "Enterprise").required(),
    GSTIN : Joi.string().optional(),
    HSN : Joi.number().integer().optional(),
    stateCode: Joi.number().integer().optional(),
    address: addressSchema
});

export {businessSchema};