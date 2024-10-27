// users-controller.ts
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { ResponseEntity } from "../lib/ApiResponse";
import { HttpStatusCode } from "../lib/status-codes";
import { createUser } from "../service/users";
import logger from '../lib/logConfig';

export const handleUserRegister = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            res.status(HttpStatusCode.BAD_REQUEST).json(ResponseEntity("error", "Invalid Data"));
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = { name, email, password: hashedPassword };
        const createdUser = await createUser(userData)
        res.status(HttpStatusCode.CREATED)
            .json(ResponseEntity("success", "User Created Successfully", createdUser));

    } catch (error: unknown) {
        
        if ((error as any).code === 11000) {
            // Duplicate key error (email already exists)
            logger.warn((error as Error).message)
            res.status(HttpStatusCode.CONFLICT)
                .json(ResponseEntity("error", "User already exists", undefined, "The provided email is already registered."));

        } else {
            logger.error((error as Error).stack)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json(ResponseEntity("error", "Unable to Register User", undefined, (error as Error).message));
        }
    }
};

