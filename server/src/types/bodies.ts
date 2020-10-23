import {Document} from "mongoose"
import {Category, Pizza} from "./models"

export type CategoryBody = Omit<Category, "pizzas"> & {
    pizzas: Array<string | Pizza & Document>
}
