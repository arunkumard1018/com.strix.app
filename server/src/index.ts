import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { authMiddleWare, logReqRes } from './middlewares';
import { authRouter } from "./routes/auth";
import apiRouter from './routes/info';
import usersRouter from "./routes/users";
import passport from 'passport';
import cors from "cors";
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

/**Authentication Middleware */
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers you need
    credentials: true,
}));

app.use(passport.initialize());

/** Api Routes */
app.use("/", apiRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", authMiddleWare, usersRouter)


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