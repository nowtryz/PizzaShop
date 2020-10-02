//Access the router on Express 
import {Router} from 'express'
//Access the controllers
import clientController from  '../controllers/client'

const router = Router()

//CREATE
router.post("/", clientController.createClient)

router.get("/", clientController.readClients)

router.get("/{id}", clientController.readClient)

router.delete("/{id}", clientController.deleteclient)

router.put("/{id}", clientController.editClient)

router.get("/{id}/orders", clientController.readClientOrders)

router.get("/{id}/bookings", clientController.readClientBooking)


export default router


