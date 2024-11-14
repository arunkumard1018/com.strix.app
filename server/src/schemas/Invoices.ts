import Joi from 'joi';
import { Address, Person, ProductInvoiceDetails, TransportInvoiceDetails } from '../types/invoice';
import { Invoice } from '../model/Invoice';

const TransportInvoiceDetailsSchema = Joi.object<TransportInvoiceDetails>({
    vehicleNo: Joi.string().required().messages({
        'string.base': '"vehicleNo" should be a type of text',
        'any.required': '"vehicleNo" is a required field',
    }),
    source: Joi.string().optional().messages({
        'string.base': '"source" should be a type of text',
    }),
    destination: Joi.string().optional().messages({
        'string.base': '"destination" should be a type of text',
    }),
    amount: Joi.number().required().messages({
        'number.base': '"amount" should be a number',
        'any.required': '"amount" is a required field',
    }),
});

const ProductInvoiceDetailsSchema = Joi.object<ProductInvoiceDetails>({
    sku: Joi.string().required().messages({
        'string.base': '"sku" should be a type of text',
        'any.required': '"sku" is a required field',
    }),
    productName: Joi.string().required().messages({
        'string.base': '"productName" should be a type of text',
        'any.required': '"productName" is a required field',
    }),
    price: Joi.number().required().messages({
        'number.base': '"price" should be a number',
        'any.required': '"price" is a required field',
    }),
});

const addressSchema = Joi.object<Address>({
    street: Joi.string().required().messages({
        'string.base': '"street" should be a type of text',
        'any.required': '"street" is a required field',
    }),
    city: Joi.string().required().messages({
        'string.base': '"city" should be a type of text',
        'any.required': '"city" is a required field',
    }),
    postalCode: Joi.number().required().messages({
        'number.base': '"postalCode" should be a number',
        'any.required': '"postalCode" is a required field',
    }),
    state: Joi.string().required().messages({
        'string.base': '"state" should be a type of text',
        'any.required': '"state" is a required field',
    }),
});

const personSchema = Joi.object<Person>({
    name: Joi.string().required().messages({
        'string.base': '"name" should be a type of text',
        'any.required': '"name" is a required field',
    }),
    GSTIN: Joi.string().optional().messages({
        'string.base': '"GSTIN" should be a type of text',
    }),
    HSN: Joi.number().optional().messages({
        'number.base': '"HSN" should be a number',
    }),
    stateCode: Joi.number().optional().messages({
        'number.base': '"stateCode" should be a number',
    }),
    PAN: Joi.string().optional().messages({
        'string.base': '"PAN" should be a type of text',
    }),
    phone: Joi.number().required().messages({
        'number.base': '"phone" should be a number',
        'any.required': '"phone" is a required field',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': '"email" must be a valid email address',
    }),
    address: addressSchema.required().messages({
        'any.required': '"address" is a required field',
    }),
});

const invoiceSchema = Joi.object<Invoice>({
    invoiceNo: Joi.string().required().messages({
        'string.base': '"invoiceNo" should be a type of text',
        'any.required': '"invoiceNo" is a required field',
    }),
    invoiceDate: Joi.date().required().messages({
        'date.base': '"invoiceDate" should be a valid date',
        'any.required': '"invoiceDate" is a required field',
    }),
    invoiceBy: personSchema.required().messages({
        'any.required': '"invoiceBy" is a required field',
    }),
    invoiceTo: personSchema.required().messages({
        'any.required': '"invoiceTo" is a required field',
    }),

    invoiceDetails: Joi.array()
        .items(
            Joi.alternatives()
                .try(TransportInvoiceDetailsSchema, ProductInvoiceDetailsSchema)
                .messages({
                    'alternatives.types': '"invoiceDetails" must contain either only Transport or only Product details',
                })
        )
        .required()
        .custom((value, helpers) => {
            const isTransport = value.every((item: TransportInvoiceDetails) => 'vehicleNo' in item);
            const isProduct = value.every((item: ProductInvoiceDetails) => 'sku' in item);

            if (!(isTransport || isProduct)) {
                return helpers.error('any.invalid', {
                    message: 'invoiceDetails should contain either only Transport or Product details, not both.',
                });
            }
            return value;
        })
        .messages({
            'array.base': '"invoiceDetails" should be an array',
            'any.required': '"invoiceDetails" is a required field',
        }),

    paymentStatus: Joi.string().valid("PROCESSING", "PAID", "DUE").required(),
    paymentMethod: Joi.string().valid("NEFT", "RTGS", "CASH","UPI","DEBIT/CREDIT CARD").required(),
    invoiceAmount: Joi.number().required().messages({
        'number.base': '"totalAmount" should be a number',
        'any.required': '"totalAmount" is a required field',
    }),
    CGST: Joi.number().optional().messages({
        'number.base': '"CGST" should be a number',
    }),
    SGST: Joi.number().optional().messages({
        'number.base': '"SGST" should be a number',
    }),
    customers: Joi.string().required().messages({
        'string.base': '"customers" should be a type of text',
        'any.required': '"customers" is a required field',
    }),
}).required();

export { invoiceSchema };
