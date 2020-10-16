import {Router} from "express";
import {createBooking, deleteBooking, editBooking, readBooking, readBookings} from "../controllers/booking";

export default Router()
.post("/", createBooking)
.get("/", readBookings)
.get("/:id", readBooking)
.put("/:id", editBooking)
.delete("/:id", deleteBooking);