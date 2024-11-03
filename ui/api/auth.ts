import { UserData } from "@/store/slices/userSlice";
import { axiosClient } from "./axiosClient";
import { ApiResponse } from "@/types/api-responses";



export interface AuthResponse { token: string; user: UserData }
const authenticate = async (email: string, password: string) => {
    try {
        const response = await axiosClient.post<ApiResponse<AuthResponse>>("/api/auth/authenticate", { email, password })
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

const authenticateGoogleCode = async (code: string) => {
    try {
        const response = await axiosClient.post<ApiResponse<AuthResponse>>("/api/auth/google", { code })
        return response.data
    } catch (error:unknown) {
        throw error;
    }
}
const registerUser = async (name:string, email:string, password:string) => {
    try {
        const response = await axiosClient.post("/api/auth/register",{name,email,password});
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }

}
const getUsersInfo = async () => {
    try {
        const response = await axiosClient.get("/api/auth/users/info")
        return response.data;

    } catch (error: unknown) {
        throw error;
    }
}

export { authenticate, getUsersInfo, authenticateGoogleCode , registerUser};

