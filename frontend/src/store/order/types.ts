import {Product} from "pizza-shop-commons/models";

export const ADD_PRODUCT = "add product"
export const OPEN_DIALOG = "open dialog"
export const CLOSE_DIALOG = "close dialog"
export const EMPTY_CART = "empty cart"


export interface AddProductAction {
    type: typeof ADD_PRODUCT
    payload: Product
}

export interface EmptyCartAction {
    type: typeof EMPTY_CART
}

export interface OpenOrderDialogAction {
    type: typeof OPEN_DIALOG
}

export interface CloseOrderDialogAction {
    type: typeof CLOSE_DIALOG
}

export type OrderActionTypes =
    AddProductAction |
    EmptyCartAction |
    OpenOrderDialogAction |
    CloseOrderDialogAction
