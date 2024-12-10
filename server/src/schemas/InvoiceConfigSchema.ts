import Joi from "joi";

/** Joi Schema for invoiceConfig validation */
const invoiceConfigJoiSchema = Joi.object({
    invoiceHeading: Joi.object({
        heading: Joi.string().required().messages({
            "string.empty": "Heading is required",
        }),
        subHeading: Joi.string().allow(null, "").messages({
            "string.base": "Subheading must be a string",
        }),
        title: Joi.string().allow(null, "").messages({
            "string.base": "Title must be a string",
        }),
    }),

    invoiceFrom: Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "Name is required",
        }),
        street: Joi.string().required().messages({
            "string.empty": "Street is required",
        }),
        city: Joi.string().required().messages({
            "string.empty": "City is required",
        }),
        state: Joi.string().required().messages({
            "string.empty": "State is required",
        }),
        postalCode: Joi.number().required().messages({
            "number.base": "Postal code must be a number",
            "any.required": "Postal code is required",
        }),
        phone: Joi.number().required().messages({
            "number.base": "Phone number must be a number",
            "any.required": "Phone number is required",
        }),
    }),

    invoiceDetails: Joi.object({
        invoicePrefix: Joi.string().required().messages({
            "string.empty": "Invoice Prefix is required",
        }),
        invoiceNo: Joi.number().required().messages({
            "number.base": "Invoice number must be a number",
            "any.required": "Invoice number is required",
        }),
        GSTIN: Joi.string().allow(null, "").messages({
            "string.base": "GSTIN must be a string",
        }),
        PAN: Joi.string().allow(null, "").messages({
            "string.base": "PAN must be a string",
        }),
        HSN: Joi.number().allow(null).messages({
            "number.base": "HSN must be a number",
        }),
        stateCode: Joi.number().allow(null).messages({
            "number.base": "State code must be a number",
        }),
    }),

    bankDetails: Joi.object({
        bankName: Joi.string().allow(null, "").messages({
            "string.base": "Bank name must be a string",
        }),
        accountName: Joi.string().allow(null, "").messages({
            "string.base": "Account name must be a string",
        }),
        accountNumber: Joi.number().allow(null).messages({
            "number.base": "Account number must be a number",
        }),
        ifscCode: Joi.string().allow(null, "").messages({
            "string.base": "IFSC code must be a string",
        }),
        branch: Joi.string().allow(null, "").messages({
            "string.base": "Branch name must be a string",
        }),
    }).optional(),

    additionlInfo: Joi.object({
        thankyouNote: Joi.string().allow(null, "").messages({
            "string.base": "Thank you note must be a string",
        }),
    }).optional(),
});

export default invoiceConfigJoiSchema;
