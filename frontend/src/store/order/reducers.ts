import {ADD_PRODUCT, EMPTY_CART, OrderActionTypes, REMOVE_PRODUCT} from "./types";
import {ApiProduct} from "../../../../common/src/api";

export type OrderState = ApiProduct[]

const defaultState: OrderState = []


const orderReducers = (products = defaultState, action: OrderActionTypes):OrderState => {
    switch (action.type) {
        case ADD_PRODUCT:
            return [
                ...products,
                action.payload,
            ]
        case REMOVE_PRODUCT:
            return products.filter(value => value._id !== action.payload._id)
        case EMPTY_CART:
            return []
        
        default:
            return products
    }
}

export default orderReducers
