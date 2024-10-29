import { NextFunction, Request, Response } from "express";
import logger from "../lib/logConfig";
import Jwt from "jsonwebtoken";
import { HttpStatusCode } from "../lib/status-codes";
import { ResponseEntity } from "../lib/ApiResponse";


const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {

        const publicPaths = ['/', '/health', '/api/auth/authenticate', '/api/auth/register', '/api/auth/google']
        const currentPath = req.url;
        if (publicPaths.includes(currentPath)) {
            next();
        } else {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                res.status(HttpStatusCode.UNAUTHORIZED)
                    .json(ResponseEntity("error", "No Token", undefined, "Missing authentication token"));
                return;
            }
            const secretKey = process.env.JWT_SECRET_KEY!;
            Jwt.verify(token, secretKey, (error, decoded) => {
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
                    res.status(HttpStatusCode.UNAUTHORIZED).json(ResponseEntity("error", name, undefined, message));
                    return;
                }
            })
        }
    } catch (error) {
        const message = (error as Error).message;
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
        logger.info(`${req.method} : ${req.headers.host}${req.url}`);
        next();
    }
}

export { authMiddleWare, logReqRes }
// fs.appendFile(filename, `\n ${Date.now()} : ${req.method} : ${req.headers.host}${req.url} `, (err) => { next() })