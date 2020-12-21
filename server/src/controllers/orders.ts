import {StatusCodes} from "http-status-codes/build/cjs";
import {RequestHandler} from "express";
import Order from '../models/Order'
import {Order as IOrder} from "pizza-shop-commons/models"
import Product from "../models/Product"
import {ErrorMessage} from "../types/messages";
import {Types} from "mongoose";

export const createOrder : RequestHandler<{}, IOrder | ErrorMessage, string[]> = async (req,res) => {
    if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'You must be logged to perform this action'
        })
    }

    if (!Array.isArray(req.body) || !req.body.every(i => typeof i === "string")) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Body must be an array of string'
        })
    }

    const products = await Product.find({_id: {$in: req.body.map(Types.ObjectId)}})
    console.log(products)
    const order = new Order({
        products,
        client: req.user,
        estimation: new Date(Date.now() + 20*60*1000) // 20 from now
    })

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
