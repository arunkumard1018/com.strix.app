import express from "express";
import { handlegetUserInfo } from "../controllers/usersController";


const usersRouter = express.Router();

usersRouter.route("/")
    .get(handlegetUserInfo)

export {usersRouter}