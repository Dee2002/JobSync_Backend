const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    let user = await User.findOne({ googleId: id });
    if (!user) {
        user = await User.create({
            googleId: id,
            name: displayName,
            email: emails[0].value
        });
    }
    done(null, user);
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    let user = await User.findOne({ facebookId: id });
    if (!user) {
        user = await User.create({
            facebookId: id,
            name: displayName,
            email: emails[0].value
        });
    }
    done(null, user);
}));

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile']
}, async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    let user = await User.findOne({ linkedinId: id });
    if (!user) {
        user = await User.create({
            linkedinId: id,
            name: displayName,
            email: emails[0].value
        });
    }
    done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
