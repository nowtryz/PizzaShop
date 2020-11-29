import {Product} from "pizza-shop-commons/models"
import {ADD_PRODUCT, CLOSE_DIALOG, EMPTY_CART, OPEN_DIALOG, OrderActionTypes} from "./types";

export interface OrderState {
    dialog: boolean
    products: Product[]
}

const defaultState: OrderState = {
    dialog: false,
    products: []
}

const orderReducers = (state = defaultState, action: OrderActionTypes) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload,
                ],
            }
        case EMPTY_CART:
            return {
                ...state,
                products: []
            }
        case OPEN_DIALOG:
            return {
                ...state,
                dialog: true,
            }
        case CLOSE_DIALOG:
            return {
                ...state,
                dialog: false
            }
        default:
            return state
    }
}

export default orderReducers
