import express, { Request, Response } from "express";
import { createUser } from "../service/users";


const usersRouter = express.Router();

usersRouter.route("/:id")
    .get((req: Request, res: Response) => {
        const { id } = req.params;
        res.json({ message: `/users/${id} GET REQUEST` })
    })
    .put((req: Request, res: Response) => {
        const { id } = req.params;
        res.json({ message: `/users/${id} PUT REQUEST` })
    })
    .delete((req: Request, res: Response) => {
        const { id } = req.params;
        res.json({ message: `/users/${id} DELETE REQUEST` })
    })

usersRouter.route("/")
    .get((req: Request, res: Response) => {
        res.json({ message: '/users GET REQUEST' })
    })
    .post((req: Request, res: Response) => {
        res.json({ message: '/users POST REQUEST' })
    })

usersRouter.post("/create/:email", async (req, res) => {
    const { email } = req.params || "email.com"
    const userData = {
        name: "Aruna",
        email: email,
        password: "Password"
    }
    try {
        const result = await createUser(userData);
        console.log("Result :", result);
        res.status(201).json(result)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})


export default usersRouter;
