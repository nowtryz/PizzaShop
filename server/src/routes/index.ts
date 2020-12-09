import { Router } from 'express'
import clientRouter from './client'
import pizzaRouter from "./pizza";
import categoryRouter from "./category";
import productRouter from "./product";
import orderRouter from "./order"
import bookingRouter from "./booking"
import authentication, {openIdRouter} from "./authentication";
import passport from "../loaders/passport";

// Sensitive routes are protected by passport
export default Router()
    .use('/clients', passport.authenticate('jwt', {session:false}), clientRouter)
    .use('/orders', passport.authenticate('jwt', {session:false}), orderRouter)
    .use('/bookings', passport.authenticate('jwt', {session:false}), bookingRouter)
    .use('/pizze', pizzaRouter)
    .use('/categories', categoryRouter)
    .use('/products', productRouter)
    .use(openIdRouter)
    .use(authentication)
