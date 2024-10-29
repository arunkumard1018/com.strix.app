import { google } from "googleapis";
import dotenv from 'dotenv';
dotenv.config();


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
// const GOOGLE_CALL_BACK_URI = process.env.GOOGLE_CALL_BACK_URI!;

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
)



export { oAuth2Client }