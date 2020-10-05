import {Router} from "express";
import {readProduct, readProducts} from "../controllers/product";

export default Router()
    .get("/", readProducts)
    .get("/:id", readProduct)
