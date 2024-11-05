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
        await session.endSession();
        throw error;
    }
}

const getAllBusinessForUser = async (usersId: Id) => {
    return businessModel.find({ owner: usersId},{address:0,owner:0,__v:0,createdAt:0,updatedAt:0});
}

const getBusinessWithId = async (businessId : Id, userId : Id) => {
    return businessModel.findOne({_id:businessId,owner:userId},{__v:0,createdAt:0,updatedAt:0});
}


export { createBusiness, getAllBusinessForUser, getBusinessWithId };
