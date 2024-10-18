import express, { Router } from "express";
import userModel from "../model/users";
import { createUser } from "../service/users";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.json({ message: '/users/ GET Resource' })
})

userRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: `/users/: ${id} GET Resource` })
})

userRouter.post("/", (req, res) => {
    res.json({ message: '/users/ POST Resource' })
})

userRouter.put("/:id", (req, res) => {
    res.json({ message: '/users/:id PATCH Resource' })
})


userRouter.post("/create/:email", async (req, res) => {
    const {email} = req.params || "email.com"
    const userData = {
        name: "Aruna",
        email: email,
        password: "Password"
    }
   
    try {
        const result = await createUser(userData);
        console.log("Result :", result);
        res.status(201).json(result)
    } catch (error : any) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})


export default userRouter;
