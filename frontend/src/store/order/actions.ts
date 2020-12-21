import {
    ADD_PRODUCT,
    EMPTY_CART,
    EmptyCartAction,
    OrderActionTypes,
    REMOVE_PRODUCT
} from "./types";
import {ApiProduct} from "@pizza-shop/common";


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
