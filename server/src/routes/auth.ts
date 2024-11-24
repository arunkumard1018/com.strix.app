import express from "express";
import { handleAuthentication, handleLogout, handleOAuth2Google, handleUserRegister, handleUsersInfo } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", handleUserRegister);
authRouter.post("/authenticate", handleAuthentication)
authRouter.post('/google', handleOAuth2Google);
authRouter.post('/logout', handleLogout);
authRouter.get("/users/info",handleUsersInfo);

export { authRouter };

