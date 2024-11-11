import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { authMiddleWare, logReqRes } from './middlewares';
import { authRouter } from "./routes/auth";
import { businessRouter } from "./routes/business";
import apiRouter from './routes/info';
import { customersRouter } from "./routes/customers";
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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


/** Authentication Middleware */
app.use(cookieParser());
app.use(authMiddleWare)

/**Api Routes By Default All routes are Protected 
 * Expect the Public Routes Configured in authMiddleWare
 * Note : Changes in Route May Block the access for Public Routes due to All 
 *        Rotes are Protected By Default Configure public Routes in auth Middleware also incase of Route Changes
 */
app.use("/", apiRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users/business",businessRouter)
app.use("/api/v1/business/:businessId/customers",customersRouter)
// app.use("/api/v1/business/invoices")

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