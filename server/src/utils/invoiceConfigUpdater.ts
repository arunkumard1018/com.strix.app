import { InvoiceConfig } from "../model/InvoiceConfig";

export const getConfigUpdates = (invoiceSchema: Invoice): Partial<InvoiceConfig> => {
    const configUpdates: Partial<InvoiceConfig> = {};
    
    const { invoiceHeading, invoiceFrom, invoiceDetails, bankDetails } = invoiceSchema;

    if (invoiceHeading) {
        const { heading, subHeading, title } = invoiceHeading;
        configUpdates.invoiceHeading = { heading, subHeading, title };
    }

    if (invoiceFrom) {
        const { name, address, city, state, postalCode, phone, email } = invoiceFrom;
        configUpdates.invoiceFrom = { name, address, city, state, postalCode, phone, email };
    }

    if (invoiceDetails) {
        const { GSTIN, PAN, HSN, stateCode } = invoiceDetails;
        configUpdates.invoiceDetails = { 
            GSTIN, 
            PAN, 
            HSN, 
            stateCode,
            invoiceNo: undefined,
            invoicePrefix: undefined
        };
    }

    if (bankDetails) {
        const { bankName, accountName, accountNumber, ifscCode, branch } = bankDetails;
        configUpdates.bankDetails = { bankName, accountName, accountNumber, ifscCode, branch };
    }

    return configUpdates;
};

export const shouldUpdateConfig = (updates: Partial<InvoiceConfig>): boolean => {
    return Object.values(updates).some(value => 
        value && Object.keys(value).length > 0
    );
}; 