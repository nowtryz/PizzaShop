import {RequestHandler} from "express";
import {Product as IProduct} from "../types/models";
import Product from "../models/Product";
import {StatusCodes} from "http-status-codes/build/cjs";

export const readProducts : RequestHandler<{}, Array<IProduct>, null> = async (req, res) => {
    const products = await Product.find({})
    // TODO populate DailyMenu fields
    res.status(StatusCodes.OK).json(products)
}

export const readProduct : RequestHandler<{id: string}, IProduct | null, null> = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.status(StatusCodes.OK).json(product)
}
