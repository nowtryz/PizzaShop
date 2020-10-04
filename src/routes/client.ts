//Access the router on Express
import {Router} from 'express'
//Access the controllers
import {
    createClient,
    deleteClient,
    editClient,
    readClient,
    readClientBooking,
    readClientOrders,
    readClients
} from "../controllers/client";


export default Router()
.post("/", createClient)
.get("/", readClients)
.get("/:id", readClient)
.delete("/:id", deleteClient)
.put("/:id", editClient)
.get("/:id/orders", readClientOrders)
.get("/:id/bookings", readClientBooking)
