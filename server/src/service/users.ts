import { CreateUser, User, userModel } from "../model/users";


const createUser = (data: CreateUser)  => {
        return userModel.create(data);
};

const finduser = (email: string): Promise<User> | any => {
        return userModel.findOne({ email: email }).select("email password").exec();
}

const getUserWithBusinessDetails = async (userId: Id) => {
        /**
         * The second argument in .populate('business', 'name _id') specifies the fields you want to 
         * include from the Business collection (name and _id).
         * This will return only the name and _id fields of each associated Business, excluding all other fields.
         */
        return userModel.findById(userId, { password: 0, __v: 0, updatedAt: 0,createdAt:0 , googleId:0})
                .populate('business', 'name _id catagory logo invoicePrefix');
}

export { createUser, finduser, getUserWithBusinessDetails }