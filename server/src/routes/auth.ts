import express, { Request, Response } from "express";
import { createUser } from "../service/users";


const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const data = req.body;
    const date = new Date();
    const userData = {
        name: data.name ? data.name : "user",
        email: `${date}@gmail.com` || data.email,
        password: `${date}_PWD` || data.password
    }

    try {
        const result = await createUser(userData);
        console.log("Result :", result);
        res.status(201).json({ message: "Registerd Success Fully!", result })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
});

export { authRouter }