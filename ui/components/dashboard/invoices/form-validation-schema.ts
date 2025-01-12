import * as Yup from 'yup';
import { InvoiceConfig } from './form-data';

export const InvoiceSchema = Yup.object().shape({
    invoiceHeading: Yup.object().shape({
        heading: Yup.string().required('Heading is required'),
        subHeading: Yup.string().nullable(),
        title: Yup.string().nullable(),
    }),
    invoiceFrom: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        postalCode: Yup.string().required('Postal code is required'),
        phone: Yup.string().nullable(), // Phone is optional
    }),
    invoiceTo: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        postalCode: Yup.string().required('Postal code is required'),
        phone: Yup.string().nullable(), // Optional
        GSTIN: Yup.string().nullable(), // Optional
        PAN: Yup.string().nullable(), // Optional
    }),

    invoiceDetails: Yup.object().shape({
        invoicePrefix: Yup.string().required('Prefix is required'),
        invoiceNo: Yup.string().required('Invoice number is required'),
        invoiceDate: Yup.date().required('Invoice date is required'),
        GSTIN: Yup.string().nullable(), // Optional
        PAN: Yup.string().nullable(), // Optional
        HSN: Yup.string().nullable(), // Optional
        stateCode: Yup.string().nullable(), // Optional
        dueDate: Yup.date().required('Due date is required'), // Optional
    }),

    bankDetails: Yup.object().shape({
        bankName: Yup.string().nullable(),
        accountName: Yup.string().nullable(),
        accountNumber: Yup.string().nullable(),
        ifscCode: Yup.string().nullable(),
        branch: Yup.string().nullable(),
    }),

    additionalInfo: Yup.object().shape({
        thankyouNote: Yup.string().nullable(),
        isBankDetails: Yup.boolean().required('Bank Details field is required'),
        isTransportInvoice: Yup.boolean().required('Transport Invoice field is required'),
        paymentStatus: Yup.mixed()
            .oneOf(['Paid', 'Processing', 'Due'])
            .required('Payment status is required'),
        paymentMethod: Yup.mixed()
            .oneOf(['Cash', 'UPI', 'BankTransfer'])
            .required('Payment method is required'),
    }),
});



export function hasConfigChanged(
    currentConfig: InvoiceConfig,
    previousConfig: InvoiceConfig
): boolean {
    // Fields to exclude from comparison
    const excludedFields = [
        'invoiceDetails.invoiceDate',
        'invoiceDetails.dueDate',
        'invoiceDetails.invoiceNo',
        'additionlInfo.paymentStatus',
        'additionlInfo.paymentMethod',
        'additionlInfo.isTransportInvoice',
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareObjects = (current: any, previous: any, prefix = ''): boolean => {
        for (const key in current) {
            const fullKey = prefix ? `${prefix}.${key}` : key;

            // Skip excluded fields
            if (excludedFields.includes(fullKey)) continue;

            // Compare values
            if (
                typeof current[key] === 'object' &&
                current[key] !== null &&
                previous[key] !== undefined
            ) {
                // Recursively compare nested objects
                if (compareObjects(current[key], previous[key], fullKey)) {
                    return true;
                }
            } else if (current[key] !== previous[key]) {
                return true; // Config has changed
            }
        }
        return false; // No relevant changes
    };

    return compareObjects(currentConfig, previousConfig);
}
