import jwt from 'jsonwebtoken'
import {httpServer} from "../loaders/config"
import {RequestHandler} from "express"
import {Client as IClient} from "pizza-shop-commons/models"
import SessionHolder from "../types/session";
import {StatusCodes} from "http-status-codes/build/cjs";
import Client from "../models/Client";

const createToken = ({_id, email}) => jwt.sign(
    {id: _id, username: email},
    httpServer.jwtSecret,
)

export const signIn: RequestHandler = async (req, res) => {
    const client = await Client.findOne({email: req.body.email})
    if (client && client.comparePassword(req.body.password)) {
        req.session.id = client._id
        req.session.email = client.email
        res.status(200).json({token: createToken(client)})
    }
    else res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Unable to sign in'
    })
}

export const signup : RequestHandler = async (req, res) => {
    const client = new Client({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        pwd: req.body.password,
    })

    await client.save()
    res.status(StatusCodes.CREATED).json(client)
}

export const signOut: RequestHandler = (req, res, next) => {
    if (!req.session.logged) res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
            message: 'You must be logged to logout...'
        })

    else req.session.destroy(next)

}

export const profile : RequestHandler = (req, res) => {
    if (req.session.logged) res.send("Your are logged");
    else res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
            message: 'You must be logged'
        })

}
