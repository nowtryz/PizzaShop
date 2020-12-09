import jwt from 'jsonwebtoken'
import {httpServer} from "../loaders/config"
import {RequestHandler} from "express"
import {StatusCodes} from "http-status-codes/build/cjs";
import Client from "../models/Client"
import '../types/express-user'

const createToken = ({_id, email}) => jwt.sign(
    {id: _id, username: email},
    httpServer.jwtSecret,
)

export const signIn: RequestHandler = async (req, res) => {
    const client = await Client.findOne({email: req.body.email}).select('+password')

    if (client && client.comparePassword(req.body.password)) {
        req.session.userId = client._id
        req.session.email = client.email
        req.session.logged = true
        res.status(200).json({token: createToken(client)})
    } else res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Unable to sign in'
    })
}

export const signup : RequestHandler = async (req, res) => {
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
    if (req.user) res.json(req.user);
    else res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
            message: 'You must be logged'
        })

}
