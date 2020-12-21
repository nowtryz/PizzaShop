import jwt from 'jsonwebtoken'
import {httpServer} from "../loaders/config"
import {RequestHandler} from "express"
import {StatusCodes} from "http-status-codes/build/cjs";
import Client from "../models/Client"
import '../types/express-user'

const createToken = (id: string, email: string) => jwt.sign(
    {id, username: email},
    httpServer.jwtSecret,
    {issuer: httpServer.url, audience: httpServer.url,},
)

export const signIn: RequestHandler = async (req, res) => {
    if (req.user && req.user._id) res.status(StatusCodes.OK).json({
        token: createToken(req.user._id, req.user.email),
        user: req.user,
    })
    else res.status(StatusCodes.BAD_REQUEST).json({
        message: "no user"
    })
}

export const signup : RequestHandler = async (req, res) => {
    if (!req.body.password) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                password:{
                    name:"ValidatorError",
                    message:"Path `password` is required.",
                    properties:{
                        message:"Path `password` is required.",
                        type:"required",
                        path:"password"
                    },
                    kind:"required",
                    path:"password"
                }
            },
            _message:"Client validation failed",
            message:"Client validation failed: password: Path `password` is required."
        })
        return
    }

    const client = new Client({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        await client.validate()
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json(err)
        return
    }

    try {
        await client.save()
        res.status(StatusCodes.CREATED).json({
            ...client.toObject(),
            password: undefined
        })
    } catch (err) {
        if (err.code === 11000) { // E11000 duplicate key error
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'E11000 duplicate key error collection',
                ...err,
            })
        } else throw err
    }
}

export const signOut: RequestHandler = (req, res, next) => {
    if (!req.user) res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
            message: 'You must be logged to logout...'
        })

    else {
        req.logOut()
        // req.session.destroy(next)
        res.status(StatusCodes.NO_CONTENT).end()
    }

}

export const profile : RequestHandler = (req, res) => {
    console.log(req.user)
    if (req.user) res.json(req.user);
    else res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
            message: 'You must be logged'
        })

}

export const openIdConnect : RequestHandler = (req, res) => {
    if (req.user) res.render('return.ejs', {token: createToken(req.user._id, req.user.email)})
    else res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'unable to log the user'
    })
}
