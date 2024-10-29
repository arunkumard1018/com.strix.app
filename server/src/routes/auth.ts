import express from "express";
import { handleAuthentication, handleOAuth2Google, handleUserRegister } from "../controllers/auth-controller";

const authRouter = express.Router();

authRouter.post("/register", handleUserRegister);
authRouter.post("/authenticate", handleAuthentication)
authRouter.post('/google', handleOAuth2Google);


export { authRouter };

