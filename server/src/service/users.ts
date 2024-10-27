import { CreateUser, userModel } from "../model/users";


export const createUser =  (data:CreateUser) => {
        return  userModel.create(data);
};