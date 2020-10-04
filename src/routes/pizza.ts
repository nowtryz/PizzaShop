import {Router} from "express";
import {createPizza, deletePizza, editPizza, readPizza, readPizzas} from "../controllers/pizza";

export default Router()
.post("/", createPizza)
.get("/", readPizzas)
.get("/:id", readPizza)
.put("/:id", editPizza)
.delete("/:id", deletePizza)
