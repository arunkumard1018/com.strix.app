import express, { Request, Response } from 'express';
import { formatUptime } from '../lib/utils';

const appInfoRouter = express.Router();

appInfoRouter.get('/', (req: Request, res: Response) => {
    const ServerInfo = {
        uptime: formatUptime(process.uptime()),
        version : process.env.npm_package_version,
        os : process.env.OS,
        processor : process.env.PROCESSOR_IDENTIFIER,
    }
    res.render('index', ServerInfo);
});

appInfoRouter.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: 'OK', uptime: process.uptime() });
})
export default appInfoRouter;