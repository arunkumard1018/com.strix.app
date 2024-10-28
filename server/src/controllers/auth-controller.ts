import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { ResponseEntity } from "../lib/ApiResponse";
import logger from '../lib/logConfig';
import { HttpStatusCode } from "../lib/status-codes";
import { createUser, finduser } from "../service/users";
import jsonwebtoken from "jsonwebtoken";
import { User } from '../model/users';
import { loginSchema, userSchema } from '../schemas/UserSchema';
import axios from 'axios';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
// const REDIRECT_URI = process.env.GOOGLE_CALL_BACK_URI!; 


const handleUserRegister = async (req: Request, res: Response) => {
    try {
        const { error } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            console.debug(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const { email, name, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = { name, email, password: hashedPassword };
        const createdUser = await createUser(userData)
        res.status(HttpStatusCode.CREATED)
            .json(ResponseEntity("success", "User Created Successfully", createdUser));

    } catch (error: unknown) {

        if ((error as any).code === 11000) {
            // Duplicate key error (email already exists)
            logger.warn((error as Error).message)
            res.status(HttpStatusCode.CONFLICT)
                .json(ResponseEntity("error", "User already exists", undefined, "The provided email is already registered."));

        } else {
            logger.error((error as Error).stack)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json(ResponseEntity("error", "Unable to Register User", undefined, (error as Error).message));
        }
    }
};

const handleAuthentication = async (req: Request, res: Response) => {

    try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false })
        if (error) {
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", error.name, undefined, error.message.split('.')));
            return;
        }
        const { email, password } = req.body;
        const user: User = await finduser(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(HttpStatusCode.UNAUTHORIZED)
                .json(ResponseEntity("error", "Authentication Failed", undefined, "Invalid Email or Password"));
            return;
        }
        const secreatKey = process.env.JWT_SECRET_KEY!;
        const token = jsonwebtoken.sign({ id: user.email }, secreatKey, { expiresIn: '1h' })
        res.status(HttpStatusCode.OK).json(ResponseEntity('success', "Authentication Successfull", { token }))

    } catch (error) {
        const message = (error as Error).message;
        logger.error(message);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Authentication Failed", undefined, message))
    }

}

// const handleOAuth2Google = async (req: Request, res: Response) => {
//     const { code } = req.body;
//     logger.info('Authorization Code:', code);

//     if (!code) {
//         res.status(400).json({ error: 'Authorization code is required' });
//         return;
//     }

//     try {
//         // Step 1: Exchange authorization code for access token and ID token
//         const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
//             code,
//             client_id: GOOGLE_CLIENT_ID,
//             client_secret: GOOGLE_CLIENT_SECRET,
//             redirect_uri: REDIRECT_URI,
//             grant_type: 'authorization_code',
//         });

//         const { access_token, id_token } = tokenResponse.data;
//         logger.info('Access Token:', access_token);
//         logger.info('ID Token:', id_token);

//         // Step 2: Verify the ID token (this step ensures token validity)
//         const tokenInfoResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
//         const { email, sub: googleId, name } = tokenInfoResponse.data;
//         logger.info('Token Verification Data:', tokenInfoResponse.data);

//         // Step 3: Fetch user profile using the access token
//         const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             },
//         });

//         const userDetails = userResponse.data;
//         logger.info('User Details:', userDetails);

//         // You can now use `userDetails` to check if the user exists in your database,
//         // and create a new user if they do not already exist.

//         // Optionally generate a JWT for your application (uncomment if needed)
//         // const jwtToken = jsonwebtoken.sign({ email, googleId, name }, process.env.JWT_SECRET!, { expiresIn: '1h' });

//         // Send the JWT or any other response back to the client
//         res.status(200).json({ message: 'Authentication successful', user: userDetails });

//     } catch (err) {
//         logger.error('Error during Google authentication:', err);
//         res.status(400).json({ error: 'Invalid token or token verification failed', details: (err as Error).message });
//     }
// };


export { handleUserRegister, handleAuthentication };

