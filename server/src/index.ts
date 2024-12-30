import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import logger from "./lib/logConfig";
import { authMiddleWare, logReqRes } from './middlewares';
import { authRouter } from "./routes/auth";
import { businessRouter } from "./routes/business";
import { customersRouter } from "./routes/customers";
import apiRouter from './routes/info';
import { invoiceRoute, invoiceViewRoute } from "./routes/invoice";
import { invoiceConfigRoute } from "./routes/invoiceConfig";
import { invoiceStatsRoute } from "./routes/lnvoiceStats";
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
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];
app.use(cors({
    origin: allowedOrigins,
    // origin:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
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
app.use("/", apiRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users/business", businessRouter);
app.use("/api/v1/business/:businessId/customers", customersRouter);
app.use("/api/v1/business/:businessId/invoice-config", invoiceConfigRoute);
app.use("/api/v1/business/:businessId/invoices", invoiceRoute);
app.use("/api/v1/business/:businessId/stats", invoiceStatsRoute);
app.use("/api/v1/invoices/view", invoiceViewRoute);

// Add validation for required env variables
if (!process.env.MONGO_URL) {
    logger.error('MONGO_URL is required');
    process.exit(1);
}

logger.info("Conecting To Mongo DB Server....")
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((error) => {
        logger.error("Database connection error:", error);
    });

// Add a global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Add process error handlers
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});


app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});