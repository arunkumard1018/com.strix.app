// passportConfig.js
import passport from "passport";
import google from "passport-google-oauth20"

const GoogleStrategy = google.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',

}, (accessToken, refreshToken, profile, done) => {
    // You can implement user creation/check here.
    // For now, just return the profile.
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user:any, done) => {
    done(null, user);
});
