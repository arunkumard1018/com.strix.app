import { NextFunction, Request, Response } from "express";
import logger from "../lib/logConfig";
import Jwt from "jsonwebtoken";
import { HttpStatusCode } from "../lib/status-codes";
import { ResponseEntity } from "../lib/ApiResponse";
import { colorWord } from "../lib/utils";


const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {

        const publicPaths = [
            '/',
            '/health',
            '/api/v1/auth/authenticate',
            '/api/v1/auth/register',
            '/api/v1/auth/google',
            '/api/v1/auth/logout',
            '/api/v1/business/create',
            '/api/v1/business/get',
            '/api/v1/business/update',
            '/api/v1/business/delete',
        ]
        const currentPath = req.url;
        if (publicPaths.includes(currentPath) || currentPath.startsWith('/api/v1/invoices/view/')) {
            next();
        } else {
            let token = undefined;
            token = req.cookies.token;

            if (!token) token = req.headers['authorization']?.split(' ')[1];

            if (!token) {
                logger.error(`Rejecting Request Authentication Error: No Token`);
                res.status(HttpStatusCode.UNAUTHORIZED)
                    .json(ResponseEntity("error", "No Token", undefined, "Missing authentication token"));
                return;
            }
            const secretKey = process.env.JWT_SECRET_KEY!;
            Jwt.verify(token, secretKey, (error: any, decoded: object | any) => {
                if (!error && decoded && typeof decoded !== 'string') {
                    req.authContext = {
                        userEmail: decoded.email,
                        userId: decoded.id,
                    }
                    logger.info(`Successfully Authenticated User ${req.authContext.userId} : ${req.authContext.userEmail}`)
                    next();
                } else {
                    const name = error?.name || "Authentication Error"
                    const message = error?.message || "Error While Authentication"
                    logger.error(`Rejecting Request Authentication Error: ${name} - ${message}`);
                    res.clearCookie("token");
                    res.status(HttpStatusCode.UNAUTHORIZED).json(ResponseEntity("error", name, undefined, message));
                    return;
                }
            })
        }
    } catch (error) {
        const message = (error as Error).message;
        logger.error(`Rejecting Request Authentication Error: ${message}`);
        res.status(HttpStatusCode.UNAUTHORIZED).json(ResponseEntity("error", "Unauthorized", undefined, message));
        return;
    }
}

/**
 * Middle WAre to Log Reqested User Info
 * @param filename for Logging 
 * @returns next() after Logging the Req
 */
const logReqRes = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const fullUrl = `${req.originalUrl}`;

        logger.info(`[${colorWord(req.method, "214")}] Request received from ${req.headers["sec-ch-ua-platform"]} ${fullUrl}`);
        next();
    }
}

export { authMiddleWare, logReqRes }
