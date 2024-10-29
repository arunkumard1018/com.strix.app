import { Request, Response } from "express"
import { getUserWithBusinessDetails } from "../service/users";
import { HttpStatusCode } from "../lib/status-codes";
import { ResponseEntity } from "../lib/ApiResponse";
import logger from "../lib/logConfig";

const handlegetUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.authContext.userId;
        const userInfo = await getUserWithBusinessDetails(userId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Authenticated User Info", userInfo))
    } catch (error) {
        logger.error(error)
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Authenticated User Info", (error as Error).message))
    }
}

export { handlegetUserInfo }