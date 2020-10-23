import {Router} from "express";
import {createOrder, deleteOrder, editOrder, readOrder, readOrders} from "../controllers/orders";

export default Router()
.post("/create", createOrder)
.get("/", readOrders)
.get("/:id", readOrder)
.put("/:id", editOrder)
.delete("/:id", deleteOrder)
