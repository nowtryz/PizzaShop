import passport from 'passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import {httpServer} from './config';
import Client from '../models/Client'
import {Client as IClient} from 'pizza-shop-commons/models'
import {Document} from 'mongoose'


// Configure passport authentication
passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: httpServer.jwtSecret,
}, async (jwtPayload, done) => {
    try {
        const user = await Client.findOne({_id: jwtPayload.id})
        done(null, user || false)
    } catch (err) {
        return done(err, false)
    }
}))

passport.serializeUser((user: IClient & Document, done) => {
    done(null, user.toObject());
})

passport.deserializeUser((user: IClient, done) => {
    done(null, new Client(user));
})

export default passport
