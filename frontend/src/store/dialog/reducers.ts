import { 
    CLOSE_BOOKING,
    CLOSE_ORDER,
    DialogActionTypes,
    OPEN_BOOKING,
    OPEN_ORDER
} from "./types";


export interface DialogsState {
    booking: boolean,
    order : boolean,
}

const defaultState: DialogsState = {
    booking: false,
    order: false
}

const dialogsReducers = (state = defaultState, action: DialogActionTypes) => {
    switch (action.type) {
       
        case OPEN_BOOKING:
            return {
                ...state,
                booking: true,
            }
        case CLOSE_BOOKING:
            return {
                ...state,
                booking: false
            }
        case OPEN_ORDER:
            return {
                ...state,
                order: true,
            }
        case CLOSE_ORDER:
            return {
                ...state,
                order: false
            }
        default:
            return state
    }
}

export default dialogsReducers
