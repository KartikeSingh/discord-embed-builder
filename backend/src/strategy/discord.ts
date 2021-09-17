import passport from 'passport';
import discordStrategy from 'passport-discord';
import userModel from '../models/User';
import { encrypt } from '../utility';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const data = await userModel.findOne({ id });

    return done(null, data || null);
});

passport.use(new discordStrategy({
    clientID: process.env.CLIENT_ID || "your client ID",
    clientSecret: process.env.CLIENT_SECRET || "your client secret",
    callbackURL: process.env.CLIENT_CALLBACK,
    scope: ['identify'],
}, async (access_token: string, refresh_token: string, profile: any, done: any) => {

    const data: any = await userModel.findOneAndUpdate({ id: profile.id }, { name: profile.username, avatar: profile.avatar, refresh_token: encrypt(refresh_token), access_token: encrypt(access_token) }, { new: true }) || await userModel.create({
        id: profile.id,
        name: profile.username,
        avatar: profile.avatar,
        refresh_token: encrypt(refresh_token),
        access_token: encrypt(access_token),
    });

    done(null, data)
}));