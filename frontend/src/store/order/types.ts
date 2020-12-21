import {ApiProduct} from "@pizza-shop/common";

export const ADD_PRODUCT = "add product"
export const REMOVE_PRODUCT = "remove product"
export const OPEN_DIALOG = "open dialog"
export const CLOSE_DIALOG = "close dialog"
export const EMPTY_CART = "empty cart"


export interface AddProductAction {
    type: typeof ADD_PRODUCT
    payload: ApiProduct
}

export interface RemoveProductAction {
    type: typeof REMOVE_PRODUCT
    payload: ApiProduct
}

export interface EmptyCartAction {
    type: typeof EMPTY_CART
}

export type OrderActionTypes =
    AddProductAction |
    RemoveProductAction |
    EmptyCartAction
