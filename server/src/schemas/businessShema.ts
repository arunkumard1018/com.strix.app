import Joi from "joi";


const businessSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.empty": "Name is required",
    }),
    logo: Joi.string().optional(),
    catagory: Joi.string().valid("Transport", "Retail", "Enterprise").required(),
    city: Joi.string().optional(),
    owner: Joi.string().required(),
});

export { businessSchema };
