import fs from "fs";
import { Request, Response, NextFunction } from "express";
import logger from "../lib/logConfig";

/**
 * Middle WAre to Log Reqested User Info
 * @param filename for Logging 
 * @returns next() after Logging the Req
 */
export const logReqRes = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        logger.info(`${req.method} : ${req.headers.host}${req.url}`);
        next();
    }
}


// fs.appendFile(filename, `\n ${Date.now()} : ${req.method} : ${req.headers.host}${req.url} `, (err) => { next() })