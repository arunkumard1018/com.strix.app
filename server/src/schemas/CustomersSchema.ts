import Joi from "joi";
import { addressSchema } from "./addressSchema";


const customersSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.empty": "Name is required",
    }),
    email: Joi.string().email().optional().allow("").messages({
        "string.email": "Please enter a valid email address",
    }),
    phone : Joi.number().integer().optional().allow(""),
    GSTIN : Joi.string().optional().allow(""),
    PAN : Joi.string().optional().allow(""),
    address: addressSchema
});

export {customersSchema}