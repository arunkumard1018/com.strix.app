import mongoose from "mongoose";
import { businessModel, CreateBusiness } from "../model/business";
import { userModel } from "../model/users";
import { BusinessNotFoundError } from "../errors/businessErrors";
import { InvoiceConfigModel } from "../model/InvoiceConfig";
import logger from "../lib/logConfig";

const createBusiness = async (businessData: CreateBusiness, invoicePrefix: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const business = new businessModel({
            ...businessData,
        });
        business.invoicePrefixes.push({ prefix: invoicePrefix, count: 1 })
        await business.save({ session });
        const user = await userModel.findByIdAndUpdate(
            businessData.owner,
            { $push: { business: business._id } },
            { new: true, session }
        )
        if (!user) {
            throw new Error("User not found, aborting The transaction");
        }
        await session.commitTransaction();
        await session.endSession();
        return business;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}

const updateBusiness = async (businessId: Id, businessData: CreateBusiness, invoicePrefix: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const business = await businessModel.findById(businessId);
        if (!business) throw new BusinessNotFoundError(`Business not found for id ${businessId}`);

        const invoiceConfig = await InvoiceConfigModel.findOne({ business: businessId });
        if (!invoiceConfig) {
            business.invoicePrefixes.filter((prefixs: InvoicePrefixes) => prefixs.count !== 1);
            business.invoicePrefixes.push({ prefix: invoicePrefix, count: 1 })
        } else {
            const activePrefix = invoiceConfig.invoiceDetails?.invoicePrefix;
            const activeInvoiceNo = invoiceConfig.invoiceDetails?.invoiceNo;
            const prefixIndex = business.invoicePrefixes.findIndex(
                (prefix) => prefix.prefix === invoicePrefix
            );
            if (prefixIndex === -1) {
                business.invoicePrefixes.push({ prefix: invoicePrefix, count: 1 });
                if (invoiceConfig.invoiceDetails) {
                    invoiceConfig.invoiceDetails.invoicePrefix = invoicePrefix;
                    invoiceConfig.invoiceDetails.invoiceNo = 1;
                    business.invoicePrefixes.find((prefix: InvoicePrefixes) => prefix.prefix === activePrefix)!.count = activeInvoiceNo || 0;
                }
            } else {
                if (invoiceConfig.invoiceDetails) {
                    invoiceConfig.invoiceDetails.invoicePrefix = invoicePrefix;
                    invoiceConfig.invoiceDetails.invoiceNo = business.invoicePrefixes[prefixIndex].count;
                    business.invoicePrefixes.find((prefix: InvoicePrefixes) => prefix.prefix === activePrefix)!.count = activeInvoiceNo || 0;
                }
            }
            await invoiceConfig.save({ session })
        }
        business.name = businessData.name;
        business.city = businessData.city;
        business.catagory = businessData.catagory;
        business.logo = businessData.logo;
        business.phone = businessData.phone;
        await business.save({ session });
        await session.commitTransaction();
        return business;
    } catch (error) {
        logger.error(`Error while updating business ${businessId}: ${(error as Error).message}`);
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession()
    }
}

const getAllBusinessForUser = async (usersId: Id) => {
    return businessModel.find({ owner: usersId }, { owner: 0, __v: 0, createdAt: 0, updatedAt: 0 });
}

const getBusinessWithId = async (businessId: Id, userId: Id) => {
    return businessModel.findOne({ _id: businessId, owner: userId }, { __v: 0, createdAt: 0, updatedAt: 0 });
}

const deleteBusinessWithID = async (businessId: Id, userId: Id) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Delete the business document
        const businessDeleteResult = await businessModel.deleteOne(
            { _id: businessId, owner: userId },
            { session }
        );

        // Only proceed to remove from user's business array if a document was deleted
        if (businessDeleteResult.deletedCount > 0) {
            await userModel.updateOne(
                { _id: userId },
                { $pull: { business: businessId } },
                { session }
            );
        }
        await session.commitTransaction();
        return businessDeleteResult;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

async function addInvoicePrefix(businessId: string, newPrefix: InvoicePrefixes) {
    const result = await businessModel.findByIdAndUpdate(
        businessId,
        { $push: { invoicePrefixes: newPrefix } }, // Use $push to append to the array
        { new: true } // Return the updated document
    );
    if (!result) throw new BusinessNotFoundError(`Business Not Found for Id ${businessId}`);
    return result
}

export {
    createBusiness,
    getAllBusinessForUser,
    getBusinessWithId,
    updateBusiness,
    deleteBusinessWithID,
    addInvoicePrefix,
};
