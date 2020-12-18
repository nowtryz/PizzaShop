import passport from 'passport'
import {BasicStrategy} from 'passport-http'
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt'
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth'
import {httpServer} from './config';
import Client from '../models/Client'
import {Client as IClient} from 'pizza-shop-commons/models'
import {Document} from 'mongoose'

// user/password authentication
passport.use(new BasicStrategy(
    async (email, password, done) => {
        try {
            const user = await Client.findOne({email}).select('+password')
            console.log(user)

            if (user && user.comparePassword(password)) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (err) {
            return done(err, false)
        }
    }
));



// Configure passport authentication with jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: httpServer.jwtSecret,
    issuer: httpServer.url,
    audience: httpServer.url,
    session: true
}, async (jwtPayload, done) => {
    try {
        const user = await Client.findOne({_id: jwtPayload.id})
        console.log(user)
        done(null, user || false)
    } catch (err) {
        return done(err, false)
    }
}))

// Configure passport authentification with google oauth
passport.use(new GoogleStrategy(
    {
        clientID: httpServer.GOOGLE_OAUTH_ID,
        clientSecret: httpServer.GOOGLE_OAUTH_SECRET,
        callbackURL: `${httpServer.url}/api/v1/auth/google/return`,
        session: true
    }, async (token, tokenSecret, profile, done) => {
        const {given_name, family_name, email} = profile._json
        try {
            let client = await Client.findOne({email})
            if (client == null) {
                client = new Client({
                    email,
                    name: family_name,
                    surname: given_name,
                })
                await client.save()
            }

            done(null, client)
        } catch (err) {
            done(err, false)
        }
    }
))


passport.serializeUser((user: IClient & Document, done) => {
    done(null, user.toObject());
})

passport.deserializeUser((user: IClient, done) => {
    done(null, new Client(user));
})

export default passport
