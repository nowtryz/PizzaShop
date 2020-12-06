import { 
    CLOSE_BOOKING,
    CLOSE_ORDER,
    DialogActionTypes,
    OPEN_BOOKING,
    OPEN_ORDER
} from "./types";

export const openBooking = (): DialogActionTypes => {
    return {
        type: OPEN_BOOKING
    }
}

export const closeBooking = (): DialogActionTypes => {
    return {
        type: CLOSE_BOOKING
    }
}

export const openOrder = (): DialogActionTypes => {
    return {
        type: OPEN_ORDER
    }
}

export const closeOrder = (): DialogActionTypes => {
    return {
        type: CLOSE_ORDER
    }
}
