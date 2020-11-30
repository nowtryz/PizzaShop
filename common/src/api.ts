import {Pizza, Product} from "./models";

export type ApiDocument = {
    _id: string
    _v: string
}

export type ApiProduct = ApiDocument & Product
export type ApiPizza = ApiDocument & Pizza
