import {Types, Document} from "mongoose";

export type Ref<T> = Types.ObjectId | T

export interface Product {
    name: string
    price: number
}

export interface Pizza extends Product {
    ingredients: Array<string>
    allergen: Array<string>
}

export interface DailyMenu extends Product {
    starter: Ref<SimpleProduct>
    pizza: Ref<Pizza>
    dessert: Ref<SimpleProduct>
}

export const productTypeEnum = ["drink", "starter", "dessert"] as const
export type ProductType = typeof productTypeEnum[number]

export interface SimpleProduct extends Product {
    type: ProductType
}

export interface Category {
    name: String
    pizzas: Array<Ref<Pizza>>
}

export interface Client {
    name: string
    surname: string
    email: string
    password: string
    loyaltyPoint: bigint
    bookings: Array<Booking & Document>
    orders: Array<Order & Document>
}

export interface Order {
    products: Array<Product>
    taken: Date
    estimation: Date
    prepared: Date,
    client: Ref<Client>
}

export interface Booking {
    date: Date
    peopleCount: Number
    client: Ref<Client>
}
