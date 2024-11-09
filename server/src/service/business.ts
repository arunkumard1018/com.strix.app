import mongoose from "mongoose";
import { businessModel, CreateBusiness } from "../model/business";
import { userModel } from "../model/users";

const createBusiness = async (businessData: CreateBusiness) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const business = new businessModel({
            ...businessData,
        });
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
    } finally{
        session.endSession();
    }
}

const updateBusiness = async (businessId: Id, businessData: CreateBusiness) => {
    return await businessModel.findOneAndUpdate(
        { _id: businessId, owner: businessData.owner },
        { ...businessData },
        { new: true, runValidators: true }
    );
}

const getAllBusinessForUser = async (usersId: Id) => {
    return businessModel.find({ owner: usersId }, { address: 0, owner: 0, __v: 0, createdAt: 0, updatedAt: 0 });
}

const getBusinessWithId = async (businessId: Id, userId: Id) => {
    return businessModel.findOne({ _id: businessId, owner: userId }, { __v: 0, createdAt: 0, updatedAt: 0 });
}

const deleteBusinessWithID = async (businessId : Id, userId: Id) => {
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
        session.endSession();
    }
};


export { createBusiness, getAllBusinessForUser, getBusinessWithId, updateBusiness, deleteBusinessWithID };
