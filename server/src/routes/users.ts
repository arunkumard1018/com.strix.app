import express, { Request, Response } from "express";
import { userModel } from "../model/users";


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
    .get(async (req: Request, res: Response) => {
        const data = await userModel.find();
        res.json({ data })
    })
    .post((req: Request, res: Response) => {
        res.json({ message: '/users POST REQUEST' })
    })
    .delete(async (req: Request, res: Response) => {
        const result  = await userModel.deleteMany({});
        console.log(result)
        res.status(200).json({ message: 'users Deleted', result : result })
    })
    

export default usersRouter;
