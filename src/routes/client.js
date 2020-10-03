//Access the router on Express
import {Router} from 'express'
import {
    createClient,
    deleteClient,
    editClient,
    readClient,
    readClientBooking,
    readClientOrders,
    readClients
} from "../controllers/client";
import Client from "../models/Client";
//Access the controllers

const router = Router()

//CREATE
router.post("/", createClient)

router.get("/", readClients)

router.get("/:id", readClient)

router.delete("/:id", deleteClient)

router.put("/:id", editClient)

router.get("/:id/orders", readClientOrders)

router.get("/:id/bookings", readClientBooking)


export default router


