import express from "express";
import { handleUserRegister } from "../controllers/users-controller";

const authRouter = express.Router();

authRouter.post("/register", handleUserRegister);

export { authRouter };
