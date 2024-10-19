import express, { Request, Response } from 'express';

const appInfoRouter = express.Router();

appInfoRouter.get('/', (req: Request, res: Response) => {
    res.render('index', { message: 'Welcome to Strix Invoice website!',uptime: process.uptime() });
});

appInfoRouter.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: 'OK', uptime: process.uptime() });
})
export default appInfoRouter;