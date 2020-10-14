import {StatusCodes} from "http-status-codes/build/cjs";
import {RequestHandler} from "express";
import Order from '../models/Order'
import {Order as IOrder} from "../types/models";

export const createOrder : RequestHandler<{}, IOrder, IOrder> = async (req,res) => {
    const order = new Order(req.body)
    try {
        await order.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    await order.save()
    res.status(StatusCodes.CREATED).json(order)
}

export const readOrders : RequestHandler<{}, Array<IOrder>, null> = async (req, res) => {
    const orders = await Order.find({})
    res.status(StatusCodes.OK).json(orders)
}

export const readOrder : RequestHandler<{id: string}, IOrder | null, null> = async (req, res) => {
    const order = await Order.findById(req.params.id)
    res.status(StatusCodes.OK).json(order)
}

export const editOrder : RequestHandler<{id: string}, IOrder, IOrder> = async (req, res) => {
    const _id = req.params.id
    const order = new Order({...req.body, _id,})

    try {
        await order.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    // @ts-ignore
    await Order.replaceOne({_id}, order)
    res.status(StatusCodes.OK).json(order)
}

export const deleteOrder : RequestHandler<{id: string}, null, null> = async (req, res) => {
    Order.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).end()
}