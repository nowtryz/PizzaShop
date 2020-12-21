import {
    CLOSE_BOOKING,
    CLOSE_LOGIN,
    CLOSE_ORDER,
    DialogActionTypes,
    OPEN_BOOKING,
    OPEN_LOGIN,
    OPEN_ORDER
} from "./types";


export interface DialogsState {
    booking: boolean
    order : boolean
    login: boolean
}

const defaultState: DialogsState = {
    booking: false,
    order: false,
    login: false,
}

const dialogsReducers = (state = defaultState, action: DialogActionTypes) => {
    switch (action.type) {
        case OPEN_BOOKING: return {
                ...state,
                booking: true,
            }
        case CLOSE_BOOKING: return {
                ...state,
                booking: false,
            }
        case OPEN_ORDER: return {
                ...state,
                order: true,
            }
        case CLOSE_ORDER: return {
                ...state,
                order: false,
            }
        case OPEN_LOGIN: return {
                ...state,
                login: true,
            }
        case CLOSE_LOGIN: return {
                ...state,
                login: false,
            }
        default: return state
    }
}

export default dialogsReducers
