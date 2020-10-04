import { Router } from 'express'
import clientRouter from './client'
import pizzaRouter from "./pizza";

export default Router()
    .use('/clients', clientRouter)
    .use('/pizze', pizzaRouter)
