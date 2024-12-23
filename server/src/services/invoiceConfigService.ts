import logger from "../lib/logConfig";
import { InvoiceModel } from "../model/Invoice";
import { CreateInvoiceConfig, InvoiceConfigModel } from "../model/InvoiceConfig";

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

export {
    createInvoiceConfig,
    getInvoiceConfig,
    updateInvoiceConfig,
    deleteInvoiceConfig,
    getInvoiceNo,
    updateInvoiceNo,
    incrementInvoiceNo,
}