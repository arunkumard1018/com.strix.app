import fs from "fs";
import { Request, Response, NextFunction } from "express";


export const logReqRes = (filename: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fs.appendFile(filename, `\n ${Date.now()} : ${req.method} : ${req.headers.host}${req.url} `, (err) => { next() })
    }
}