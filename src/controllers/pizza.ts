import {StatusCodes} from "http-status-codes/build/cjs";
import {RequestHandler} from "express";
import Pizza from '../models/Pizza'
import {Pizza as IPizza} from "../models/types";

export const createPizza : RequestHandler<{}, IPizza, IPizza, null> = async (req, res) => {
    const pizza = new Pizza(req.body)
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

export const editPizza : RequestHandler<{id: string}, IPizza, null> = async (req, res) => {
    // @ts-ignore
    const newPizza = await Pizza.findOneAndReplace({_id: req.params.id}, req.body)
    res.status(StatusCodes.OK).json(newPizza)
}

export const deletePizza : RequestHandler<{id: string}, null, null> = async (req, res) => {
    Pizza.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT)
}
