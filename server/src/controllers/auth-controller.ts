import axios from 'axios';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { ResponseEntity } from "../lib/ApiResponse";
import { oAuth2Client } from "../lib/googleAuthConfig";
import logger from '../lib/logConfig';
import { HttpStatusCode } from "../lib/status-codes";
import { loginSchema, userSchema } from '../schemas/UserSchema';
import { createUser, finduser, getUserWithBusinessDetails } from "../service/users";


const generateJwtToken = (userId: Id, email: string): string => {
    const secreatKey = process.env.JWT_SECRET_KEY!;
    const tokenExpiry = process.env.JWT_TOKEN_EXPIRY!;
    const token = jsonwebtoken.sign({ id: userId, email: email }, secreatKey, { expiresIn: tokenExpiry });
    return token;
}
const cookieConfig = {
    httpOnly: true,   // Cookie is not accessible via JavaScript
    secure: true,     // Ensures cookie is sent over HTTPS
    domain: process.env.APP_DOMAIN || '.localhost:3000', // Share cookie across all subdomains
    path: '/',        // Make cookie accessible to all routes
    maxAge: 8 * 60 * 60 * 1000,
    // sameSite: 'lax',  // Prevent CSRF while allowing subdomain requests
};

const handleUserRegister = async (req: Request, res: Response) => {
    try {
        const { error } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.debug(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const { email, name, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = { name, email, password: hashedPassword };
        const createdUser = await createUser(userData)

        const user: any = createdUser.toObject ? createdUser.toObject() : createdUser;
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;

        const token = generateJwtToken(user._id, user.email);
        res.cookie('token', token, { ...cookieConfig,sameSite: 'lax',});
        res.status(HttpStatusCode.CREATED)
            .json(ResponseEntity("success", "User Created Successfully", { token, user: user }));

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
        const user = await finduser(email);
        if (!user || !(await bcrypt.compare(password, user.password!))) {
            res.status(HttpStatusCode.UNAUTHORIZED)
                .json(ResponseEntity("error", "Authentication Failed", undefined, "Invalid Email or Password"));
            return;
        }
        const token = generateJwtToken(user._id, user.email);
        const userDeatils = await getUserWithBusinessDetails(user._id);
        res.cookie('token', token, { ...cookieConfig,sameSite: 'lax',});
        res.status(HttpStatusCode.OK).json(ResponseEntity('success', "Authentication Successfull", { token, user: userDeatils }))
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Authentication Failed", message))
    }
}

const handleOAuth2Google = async (req: Request, res: Response) => {
    const { code } = req.body;
    try {
        const googleResponse = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(googleResponse.tokens);

        const userResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo`,
            {
                headers: {
                    Authorization: `Bearer ${googleResponse.tokens.access_token}`
                }
            }
        );
        const { id, name, email, picture } = userResponse.data;
        var token;
        var userDeatils: any;
        const user = await finduser(email);
        if (user) {
            userDeatils = await getUserWithBusinessDetails(user._id);
            token = generateJwtToken(user._id, user.email);
        } else {
            const userData = { name, email, googleId: id, picture };
            const createdUser = await createUser(userData)

            const userInfo: any = createdUser.toObject ? createdUser.toObject() : createdUser;
            delete userInfo.password;
            delete userInfo.createdAt;
            delete userInfo.updatedAt;
            delete userInfo.__v;
            delete userInfo.googleId;

            token = generateJwtToken(userInfo._id, email);
            userDeatils = userInfo;
        }
        res.cookie('token', token, { ...cookieConfig,sameSite: 'lax',});
        res.status(HttpStatusCode.OK).json(ResponseEntity('success', "Authentication Successfull", { token, user: userDeatils }))
    } catch (error) {
        logger.error("GOOGLE AUTH ERROR", error)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json((error as Error).message);
    }
}

const handleUsersInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.authContext.userId;
        const userInfo = await getUserWithBusinessDetails(userId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Authenticated User Info", { user: userInfo }))
    } catch (error) {
        logger.error(error)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("success", "Authenticated User Info", (error as Error).message))
    }
}

const handleLogout = async (req: Request, res: Response) => {
    res.clearCookie('token', { ...cookieConfig, sameSite:"lax" });
    res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Logged out successfully"));
}

export { handleAuthentication, handleOAuth2Google, handleUserRegister, handleLogout, handleUsersInfo };
