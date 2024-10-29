import express from "express";
import { handlegetUserInfo } from "../controllers/users-controller";


const usersRouter = express.Router();

usersRouter.route("/")
    .get(handlegetUserInfo)

export {usersRouter}