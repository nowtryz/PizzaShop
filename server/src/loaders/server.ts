import 'express-async-errors'
import {StatusCodes} from "http-status-codes/build/cjs"
import cors from "cors"
import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import apiRouter from "../routes"
import logger from "./logger"
import session from 'express-session'
import connectMongo from 'connect-mongo'
import {connection} from 'mongoose'
import {httpServer} from "./config"
import {Strategy, ExtractJwt} from 'passport-jwt'
import passport from 'passport'
import compression from 'compression'
import Client from "../models/Client";

const MongoStore = connectMongo(session)

// Configure passport authentication
passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: httpServer.jwtSecret,
}, async (jwt_payload, done) => {
    try {
        const user = await Client.findOne({id: jwt_payload.sub})
        done(null, user || false)
    } catch (err) {
        return done(err, false)
    }
}))

export default express()

// used to fetch the data from forms on HTTP POST, and PUT
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))

// Use the morgan logging
    .use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Other configuration for best practices
    .use(cors())
    .use(compression())

// Use mongo sessions
    .use(session({
        resave: true,
        saveUninitialized: true,
        secret: httpServer.sessionSecret,
        store: new MongoStore({mongooseConnection: connection, autoReconnect: true})
    }))

// use Jwt authentification
    .use(passport.initialize())
    // .use(passport.session())

// Routes
    .use('/api/v1/', apiRouter)

// Catch internal server error
    .use(async (error : Error, req, res, next) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        logger.error(error.message)
    })

// Ressource not found
    .use((req, res) => {
        logger.error('HTTP 404: ask for:  ' + req.protocol + '://' + req.get('host') + req.originalUrl);
        res.status(404).json({
            msg:'Unavailable address'
        });
    })
