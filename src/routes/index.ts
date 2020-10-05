import { Router } from 'express'
import clientRouter from './client'
import pizzaRouter from "./pizza";
import categoryRouter from "./category";

export default Router()
    .use('/clients', clientRouter)
    .use('/pizze', pizzaRouter)
    .use('/categories', categoryRouter)
