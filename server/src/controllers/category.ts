import {RequestHandler} from "express";
import {Category as ICategory} from "pizza-shop-commons/models";
import Category from "../models/Category";
import {StatusCodes} from "http-status-codes/build/cjs";
import {CategoryBody} from "../types/bodies";

export const createCategory : RequestHandler<{}, ICategory, ICategory> = async (req, res) => {
    const category = new Category(req.body)

    try {
        await category.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    await category.save()
    res.status(StatusCodes.CREATED).json(category)
}

export const readCategories : RequestHandler<{}, Array<ICategory>, null> = async (req, res) => {
    const categories = await Category.find({}).populate('pizzas')
    res.status(StatusCodes.OK).json(categories)
}

export const readCategory : RequestHandler<{id: string}, ICategory | null, null> = async (req, res) => {
    const category = await Category.findById(req.params.id).populate('pizzas')
    res.status(StatusCodes.OK).json(category)
}

export const editCategory : RequestHandler<{id: string}, ICategory | null, CategoryBody> = async (req, res) => {
    const _id = req.params.id
    const pizzas = req.body.pizzas?.map(i => typeof i === "string" ? i : i._id)
    const category = new Category({...req.body, _id, pizzas})

    try {
        await category.validate()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }

    await Category.replaceOne({_id}, category)
    res.status(StatusCodes.OK).json(category)
}

export const deleteCategory : RequestHandler<{id: string}, null, null> = async (req, res) => {
    Category.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).end()
}
