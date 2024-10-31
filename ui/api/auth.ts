import { axiosClient } from "./axiosClient";

const authenticate = async (email: string, password: string) => {
    try {
        const response = await axiosClient.post("/api/auth/authenticate", { email, password })
        return response.data;

    } catch (error: unknown) {
        console.log((error as Error).message)
        throw new Error("Error While Fetching Users Info");
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

export { authenticate, getUsersInfo };

