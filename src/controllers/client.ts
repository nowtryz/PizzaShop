import {StatusCodes} from "http-status-codes/build/cjs";
import {RequestHandler} from "express"
import Client from '../models/Client'
import Booking from "../models/Booking"
import Order from "../models/Order"
import {
    Client as IClient,
    Order as IOrder,
    Booking as IBooking,
} from "../models/types"

export const createClient : RequestHandler<{}, IClient, IClient, null> = async (req,res) => {
    const newClient = new Client(req.body)
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
    // @ts-ignore
    const newClient = await Client.findOneAndReplace({_id: req.params.id}, req.body)
    res.status(StatusCodes.OK).json(newClient)

}

export const deleteClient : RequestHandler<{id:string}, null, null> = async (req,res)=>{
    await Client.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT)
}

export const readClientOrders : RequestHandler<{id:string}, Array<IOrder>, null> = async (req,res)=>{
    res.status(StatusCodes.OK).json(await Order.find({
        client: req.params.id
    }).select('-client'))
}

export const readClientBooking : RequestHandler<{id:string}, Array<IBooking>, null> = async (req,res)=>{
    res.status(StatusCodes.OK).json(await Booking.find({
        client: req.params.id
    }).select('-client'))
}
