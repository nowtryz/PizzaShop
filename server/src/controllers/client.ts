import {StatusCodes} from "http-status-codes/build/cjs";
import {RequestHandler} from "express"
import Client from '../models/Client'
import Booking from "../models/Booking"
import Order from "../models/Order"
import {
    Client as IClient,
    Order as IOrder,
    Booking as IBooking,
} from "pizza-shop-commons/models"

export const createClient : RequestHandler<{}, IClient, IClient, null> = async (req,res) => {
    const newClient = new Client(req.body)

    try {
        await newClient.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    await newClient.save()
    res.status(StatusCodes.CREATED).json(newClient)

}

//Read Clients
export const readClients : RequestHandler<{}, Array<IClient>, null> = async (req,res) => {
    const clients = await Client.find({})
    res.status(StatusCodes.OK).json(clients)
}

export const readClient : RequestHandler<{id:string}, IClient | null, null> = async (req,res) => {
    const client = await Client.findById(req.params.id)
    res.status(StatusCodes.OK).json(client)
}

export const editClient : RequestHandler<{id:string}, IClient, IClient> = async (req,res)=> {
    const _id = req.params.id
    const client = new Client({...req.body, _id})

    try {
        await client.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    // @ts-ignore
    await Client.findOneAndReplace({_id}, client)
    res.status(StatusCodes.OK).json(client)

}

export const deleteClient : RequestHandler<{id:string}, null, null> = async (req,res)=>{
    await Client.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).end()
}

export const readClientOrders : RequestHandler<{id:string}, Array<IOrder>, null> = async (req,res)=>{
    const orders = await Order.find({
        client: req.params.id
    }).select('-client')

    res.status(StatusCodes.OK).json(orders)
}

export const readClientBooking : RequestHandler<{id:string}, Array<IBooking>, null> = async (req,res)=>{
    const bookins = await Booking.find({
        client: req.params.id
    }).select('-client')

    res.status(StatusCodes.OK).json(bookins)
}
