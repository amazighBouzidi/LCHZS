import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv"
import UserModel from "./model/User.model";
import bcrypt from 'bcrypt'

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
        clientID: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET_KEY}`,
        callbackURL: `${process.env.CALLBACK_URL}`,
        scope: ['profile', 'email', 'phone', 'address'],
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await UserModel.findOne(profile.id);
        if (existingUser) {
            return done(null, existingUser);
        }else{
          const newUser = await UserModel.create({
            _id: profile.id,
            lastName: profile.name.familyName,
            firstName: profile.name.givenName,
            phoneNumber: profile.phoneNumbers && profile.phoneNumbers[0].value, // Get phoneNumber from profile if available
            address: profile.addresses && profile.addresses[0].formatted,
            profile: profile.photos[0].value, // You can set the profile URL if available in the Google profile
            email: profile.emails[0].value,
            password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10), // You can set a default password or leave it empty
            userType: 'client',
          })
          return done(null, newUser);
        }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

