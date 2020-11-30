import {ADD_PRODUCT, CLOSE_DIALOG, EMPTY_CART, OPEN_DIALOG, OrderActionTypes, REMOVE_PRODUCT} from "./types";
import {ApiProduct} from "../../../../common/src/api";

export interface OrderState {
    dialog: boolean
    products: ApiProduct[]
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
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(value => value._id !== action.payload._id)
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
