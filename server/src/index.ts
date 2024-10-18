import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { logReqRes } from './middlewares';
import userRouter from "./routes/users";
dotenv.config()

/**
 * Connection for Mongo DB
 */
mongoose.connect(process.env.MONGO_URL!)
.then(() => console.info("Database Connected Successfully"))
.catch((e) => console.error(`Error Connecting Database ${e.message}`));


const app = express();
const PORT = process.env.SERVER_PORT

app.use(logReqRes("logs.txt"))


// Routes
app.get("/", (req : Request, res:Response) => {
    console.log("HEDERS",req.headers)
    res.json({ message: "App is Upand Running Successfully !" })
});

app.use("/api/users",userRouter)

app.listen(PORT, () => console.info(`Server started at PORT ${PORT}`));