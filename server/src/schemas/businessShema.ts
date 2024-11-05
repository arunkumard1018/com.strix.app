import Joi from "joi";


const addressSchema = Joi.object({
    street: Joi.string().min(3).required().messages({
        "string.min": "Street must be at least 3 characters long",
        "string.empty": "Street is required",
    }),
    city: Joi.string().required().messages({
        "string.empty": "City is required",
    }),
    postalCode: Joi.number().integer().required().messages({
        "number.base": "Zip must be a number",
        "any.required": "Zip is required",
    }),
    state: Joi.string().required().messages({
        "any.required": "State  is required",
    })
});

const businessSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.empty": "Name is required",
    }),
    email: Joi.string().email().optional().messages({
        "string.email": "Please enter a valid email address",
    }),
    logo: Joi.string().optional(),
    catagory: Joi.string().valid("Transport", "Retail", "Enterprise").required(),
    GSTIN : Joi.string().optional(),
    HSN : Joi.number().integer().optional(),
    stateCode: Joi.number().integer().optional(),
    address: addressSchema
});

export {businessSchema};