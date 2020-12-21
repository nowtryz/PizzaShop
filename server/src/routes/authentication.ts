import {Router} from 'express'
import {openIdConnect, profile, signIn, signOut, signup} from "../controllers/authentication";
import passport from "passport";

export default Router()
    .post('/signup', signup)
    .post('/sign-in', passport.authenticate(['basic', 'jwt']), signIn)
    .post('/sign-out', signOut)
    .get('/profile', profile)

export const openIdRouter = Router()
    .post('/auth/openid', passport.authenticate('openid'))
    .get('/auth/openid/return', passport.authenticate('openid'), openIdConnect)
    .get('/auth/google', passport.authenticate('google', {
        scope: ['openid', 'profile ', 'email']
    }))
    .get('/auth/google/return', passport.authenticate('google'), openIdConnect)
