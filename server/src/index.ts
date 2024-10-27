import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { logReqRes } from './middlewares';
import apiRouter from './routes/info';
import usersRouter from "./routes/users";
import { authRouter } from "./routes/auth";

dotenv.config()


const app = express();
const PORT = process.env.SERVER_PORT || 8001

/* Middle Ware for Req and Res Info Logging */
app.use(logReqRes())
/* Middleware to Parse Json Data */
app.use(express.json());

/**View Engine middleware for EJS */
app.set('view engine', 'ejs');
app.set('views', './views');


/** Api Routes */
app.use("/", apiRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)


console.log("Conecting To Mongo DB Server....")

mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});