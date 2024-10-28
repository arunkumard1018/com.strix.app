import { CreateUser, User, userModel } from "../model/users";


export const createUser = (data: CreateUser) => {
        return userModel.create(data);
};

export const finduser = (email: string) : Promise<User> | any => {
        return userModel.findOne({ email: email }).exec();
}

