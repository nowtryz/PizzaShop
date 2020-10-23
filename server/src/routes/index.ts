import { Router } from 'express'
import clientRouter from './client'
import pizzaRouter from "./pizza";
import categoryRouter from "./category";
import productRouter from "./product";
import orderRouter from "./order"
import bookingRouter from "./booking"

export default Router()
    .use('/clients', clientRouter)
    .use('/pizze', pizzaRouter)
    .use('/categories', categoryRouter)
    .use('/products', productRouter)
    .use('/orders',orderRouter)
    .use('/bookings',bookingRouter);

