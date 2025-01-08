import logger from "../lib/logConfig";
import { InvoiceModel } from "../model/Invoice";
import { CreateInvoiceConfig, InvoiceConfigModel } from "../model/InvoiceConfig";
import { ClientSession } from 'mongoose';
import { validateInvoiceConfig } from "../utils/invoiceValidator";
import { getConfigUpdates, shouldUpdateConfig } from "../utils/invoiceConfigUpdater";

const createInvoiceConfig = async (invoiceConfigData: CreateInvoiceConfig) => {
    const config = new InvoiceConfigModel({
        ...invoiceConfigData
    })
    await config.save();
    return config;
}

const getInvoiceConfig = async (businessId: Id, usersId: Id) => {
    const config = await InvoiceConfigModel.findOne({ business: businessId, user: usersId },
        { __v: 0, createdAt: 0, updatedAt: 0, user: 0, business: 0, _id: 0 }
    );
    return config;
}

const updateInvoiceConfig = async (invoiceConfigData: CreateInvoiceConfig) => {
    const business: Id = invoiceConfigData.business;
    const userId: Id = invoiceConfigData.user;
    const updatedConfig = await InvoiceConfigModel.updateOne({ business: business, user: userId },
        { ...invoiceConfigData },
        { new: true, runValidators: true }
    );
    return updatedConfig;

}

const deleteInvoiceConfig = async (businessId: Id, usersId: Id) => {
    const status = await InvoiceConfigModel.deleteOne({ business: businessId, user: usersId });
    return status;
}

/**
 * Fetches the current available invoice number for a given business and user.
 * @param businessId - The ID of the business.
 * @param usersId - The ID of the user.
 * @returns A promise that resolves to the current invoice configuration or null if not found.
 */
const getInvoiceNo = async (businessId: Id, usersId: Id) => {
    try {
        const config = await InvoiceConfigModel.findOne(
            { business: businessId, user: usersId },
            { "invoiceDetails.invoiceNo": 1, _id: 0 } // Exclude `_id` field explicitly
        );
        if (!config) {
            throw new Error("Invoice Config not found!");
        }
        return { ...config.invoiceDetails };
    } catch (error) {
        console.error("Error fetching invoice config:", error);
        throw new Error("Unable to fetch invoice configuration.");
    }
};


/**
 * Updates the invoice number for a given business and user.
 * 
 * @param businessId - The ID of the business.
 * @param usersId - The ID of the user.
 * @param invoiceNo - The new invoice number to set.
 * @returns A promise resolving to the result of the update operation.
 */
const updateInvoiceNo = async (businessId: Id, usersId: Id, invoiceNo: number): Promise<{ matchedCount: number; modifiedCount: number }> => {
    try {
        const result = await InvoiceConfigModel.updateOne(
            { business: businessId, user: usersId },
            { $set: { "invoiceDetails.invoiceNo": invoiceNo } }
        );

        return {
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
        };
    } catch (error) {
        logger.error("Error updating invoice number:", error);
        throw new Error("Unable to update invoice number.");
    }
};


/**
 * @param businessId 
 * @param usersId 
 * @returns Incremented Invoice Number
 */
const incrementInvoiceNo = async (businessId: Id, usersId: Id) => {
    const response = await getInvoiceNo(businessId, usersId);
    if (!response || !response.invoiceNo) {
        throw new Error("Invoice Config not found!");
    }
    const updatedInvoiceNo = await updateInvoiceNo(
        businessId,
        usersId,
        response.invoiceNo + 1
    );
    return updatedInvoiceNo;
};

/**
 * Creates or updates invoice configuration based on invoice data
 */
const createOrUpdateInvoiceConfig = async (
    invoiceSchema: Invoice, 
    businessId: Id, 
    session: ClientSession
) => {
    // Get invoice config with user check
    let invoiceConfig = await InvoiceConfigModel.findOne({ 
        business: businessId,
        user: invoiceSchema.user
    }).session(session);

    // If config doesn't exist, create new one
    if (!invoiceConfig) {
        logger.debug('Invoice config not found, creating new config');
        const newConfig: CreateInvoiceConfig = {
            invoiceHeading: invoiceSchema.invoiceHeading,
            invoiceFrom: invoiceSchema.invoiceFrom,
            invoiceDetails: {
                invoicePrefix: invoiceSchema.invoiceDetails.invoicePrefix || 'INV',
                invoiceNo: invoiceSchema.invoiceDetails.invoiceNo + 1,
                GSTIN: invoiceSchema.invoiceDetails.GSTIN,
                PAN: invoiceSchema.invoiceDetails.PAN,
                HSN: invoiceSchema.invoiceDetails.HSN,
                stateCode: invoiceSchema.invoiceDetails.stateCode,
            },
            bankDetails: invoiceSchema.bankDetails,
            additionalInfo: invoiceSchema.additionalInfo,
            user: invoiceSchema.user,
            business: businessId
        };

        // Create new config and get first document from array
        const [newInvoiceConfig] = await InvoiceConfigModel.create([newConfig], { session });
        invoiceConfig = newInvoiceConfig;
    } else {
        // Handle config updates for existing config
        const configUpdates = getConfigUpdates(invoiceSchema);
        validateInvoiceConfig(invoiceConfig);

        const userEnteredNo = invoiceSchema.invoiceDetails.invoiceNo;
        // After validation, we can safely assert these values exist
        const { invoiceDetails } = invoiceConfig as { invoiceDetails: { invoiceNo: number, invoicePrefix: string } };
        const { invoiceNo: configAvailableNo, invoicePrefix: prefix } = invoiceDetails;
        
        const needsConfigUpdate = shouldUpdateConfig(configUpdates) || userEnteredNo >= configAvailableNo;

        if (needsConfigUpdate) {
            const finalConfigUpdates = {
                ...configUpdates,
                invoiceDetails: {
                    ...(configUpdates.invoiceDetails || {}),
                    invoicePrefix: prefix,
                    invoiceNo: userEnteredNo >= configAvailableNo ? userEnteredNo + 1 : configAvailableNo
                }
            };

            invoiceConfig = await InvoiceConfigModel.findOneAndUpdate(
                { 
                    business: businessId,
                    user: invoiceSchema.user
                },
                { $set: finalConfigUpdates },
                { new: true, session }
            );
            logger.debug('Updated invoice config with latest details');
        }
    }

    return invoiceConfig;
};
const getActiveInvoicePrefix = async (businessId:Id, userId:Id) => {
    return InvoiceConfigModel.findOne({business:businessId, user:userId},{"invoiceDetails.invoicePrefix":1});
}

export {
    createInvoiceConfig,
    getInvoiceConfig,
    updateInvoiceConfig,
    deleteInvoiceConfig,
    getInvoiceNo,
    updateInvoiceNo,
    incrementInvoiceNo,
    createOrUpdateInvoiceConfig,
    getActiveInvoicePrefix,
}