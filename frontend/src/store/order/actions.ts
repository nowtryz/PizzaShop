import {Product} from "pizza-shop-commons/models";
import {ADD_PRODUCT, CLOSE_DIALOG, EMPTY_CART, EmptyCartAction, OPEN_DIALOG, OrderActionTypes} from "./types";


export const addProduct = (newProduct: Product): OrderActionTypes => {
    return {
        type: ADD_PRODUCT,
        payload: newProduct
    }
}

export const emptyCart = (): EmptyCartAction => {
    return {
        type: EMPTY_CART
    }
}

export const openOrderDialog = (): OrderActionTypes => {
    return {
        type: OPEN_DIALOG
    }
}

export const closeOrderDialog = (): OrderActionTypes => {
    return {
        type: CLOSE_DIALOG
    }
}
