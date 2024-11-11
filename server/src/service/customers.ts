import mongoose from "mongoose";
import { CreateCustomers, CustomersModel } from "../model/customers";
import { businessModel } from "../model/business";
import { error } from "winston";

/**
 * 
 * @param userID 
 * @param customersData 
 * @returns newely Created Customer Object
 */
const createCustomer = async (userID: Id, customersData: CreateCustomers) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const customers = new CustomersModel({
            ...customersData,
        });
        await customers.save({ session });
        const business = await businessModel.findOneAndUpdate(
            { _id: customersData.business, owner: userID },
            { $push: { customers: customers._id } },
            { new: true, session }
        )
        if (!business) {
            throw new Error("Business not found, aborting The transaction");
        }

        await session.commitTransaction();
        await session.endSession();
        return customers;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * 
 * @param userId of the Customer
 * @param businessId of Customer
 * @returns List [] of Customers
 */
const getAllCustomersForBusiness = async (userId: Id, businessId: Id) => {
    return CustomersModel.find({ business: businessId, user: userId });
}

const deleteCustomer = async (userId: Id, customersId: Id, businessId: Id) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const deletedCustomerInfo = await CustomersModel.deleteOne(
            { _id: customersId, user:userId, business:businessId },
            { session }
        );
        console.log("Delted res",deletedCustomerInfo)
        if (deletedCustomerInfo.deletedCount > 0) {
            await businessModel.updateOne(
                { _id: businessId },
                { $pull: { customers: customersId } },
                { session }
            );
        }else{
            throw new Error("Customer Details Not Found");
        }
        await session.commitTransaction();
        return deletedCustomerInfo;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}
export { createCustomer, getAllCustomersForBusiness, deleteCustomer }