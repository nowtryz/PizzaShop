import {StatusCodes} from "http-status-codes/build/cjs";
import {RequestHandler} from "express";
import Pizza from '../models/Pizza'
import {Pizza as IPizza} from "@pizza-shop/common";

export const createPizza : RequestHandler<{}, IPizza, IPizza> = async (req, res) => {
    const pizza = new Pizza(req.body)

    try {
        await pizza.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    await pizza.save()
    res.status(StatusCodes.CREATED).json(pizza)
}

export const readPizzas : RequestHandler<{}, Array<IPizza>, null> = async (req, res) => {
    const pizzas = await Pizza.find({})
    res.status(StatusCodes.OK).json(pizzas)
}

export const readPizza : RequestHandler<{id: string}, IPizza | null, null> = async (req, res) => {
    const pizza = await Pizza.findById(req.params.id)
    res.status(StatusCodes.OK).json(pizza)
}

export const editPizza : RequestHandler<{id: string}, IPizza, IPizza> = async (req, res) => {
    const _id = req.params.id
    const pizza = new Pizza({...req.body, _id,})

    try {
        await pizza.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    // @ts-ignore
    await Pizza.replaceOne({_id}, pizza)
    res.status(StatusCodes.OK).json(pizza)
}

export const deletePizza : RequestHandler<{id: string}, null, null> = async (req, res) => {
    Pizza.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).end()
}
