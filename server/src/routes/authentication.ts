import {Router} from 'express'
import {profile, signIn, signOut, signup} from "../controllers/authentication";
import passport from "passport";

export default Router()
    .post('/signup', signup)
    .post('/sign-in', signIn)
    .post('/sign-out', signOut)
    .get('/profile', profile)
