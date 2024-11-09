import Joi from "joi";

export const addressSchema = Joi.object({
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
