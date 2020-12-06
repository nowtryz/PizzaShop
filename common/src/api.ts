import {Pizza, Product} from "./models";
import {Booking, Client} from "./models";

export type ApiDocument = {
    _id: string
    _v: string
}

export type ApiProduct = ApiDocument & Product
export type ApiPizza = ApiDocument & Pizza
export type ApiBooking = ApiDocument & Booking