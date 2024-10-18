import userModel from "../model/users"


export const createUser = async (data:any) => {
    try {
        // Attempt to create a new user with validated data
        const result = await userModel.create(data);
        // Return Created  result
        return result;
    } catch (err:any) {
        // Log the error and return a 500 Internal Server Error response
        console.error("Error creating user:", err.message);
        throw new Error("Error While Fetching Data")
    }
};