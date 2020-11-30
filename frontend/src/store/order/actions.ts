import {
    ADD_PRODUCT,
    CLOSE_DIALOG,
    EMPTY_CART,
    EmptyCartAction,
    OPEN_DIALOG,
    OrderActionTypes,
    REMOVE_PRODUCT
} from "./types";
import {ApiProduct} from "pizza-shop-commons/api";


export const addProduct = (newProduct: ApiProduct): OrderActionTypes => {
    return {
        type: ADD_PRODUCT,
        payload: newProduct
    }
}

export const removeProduct = (newProduct: ApiProduct): OrderActionTypes => {
    return {
        type: REMOVE_PRODUCT,
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
