import {Router} from "express";
import {createCategory, deleteCategory, editCategory, readCategories, readCategory} from "../controllers/category";

export default Router()
.post("/", createCategory)
.get("/", readCategories)
.get("/:id", readCategory)
.put("/:id", editCategory)
.delete("/:id", deleteCategory)
