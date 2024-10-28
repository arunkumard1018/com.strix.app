import express, { Request, Response } from "express";
import { handleAuthentication, handleUserRegister } from "../controllers/auth-controller";
import logger from "../lib/logConfig";
import { oAuth2Client } from "../controllers/googleAuthConfig";
import axios, { HttpStatusCode } from "axios";

const authRouter = express.Router();

authRouter.post("/register", handleUserRegister);
authRouter.post("/authenticate", handleAuthentication)

authRouter.post('/google', async (req: Request, res: Response) => {
    const { code } = req.body;
    console.log("GOOGLE CODE", code);




    try {
        const googleResponse = await oAuth2Client.getToken(code);
        logger.info("googleResponse", googleResponse.tokens);

        oAuth2Client.setCredentials(googleResponse.tokens);

        // const userResponse = await axios.get(
        //     `https://www.googleapis.com/oauth2/v1/userinfo/alt=json&access_token=${googleResponse.tokens.access_token}`
        // )
        const userResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo`,
            {
                headers: {
                    Authorization: `Bearer ${googleResponse.tokens.access_token}`
                }
            }
        );

        console.log("USER RESPONSE", userResponse.data);
        res.json(userResponse.data);

    } catch (error) {
        logger.error(error)
        res.status(HttpStatusCode.BadRequest).json((error as Error).message);
    }
});


export { authRouter };
