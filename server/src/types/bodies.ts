import {Document} from "mongoose"
import {Category, Pizza} from "pizza-shop-commons/models"

export type CategoryBody = Omit<Category, "pizzas"> & {
    pizzas: Array<string | Pizza & Document>
}
