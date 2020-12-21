import {
    CLOSE_BOOKING,
    CLOSE_LOGIN,
    CLOSE_ORDER,
    DialogActionTypes,
    OPEN_BOOKING,
    OPEN_LOGIN,
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

export const openLogin = (): DialogActionTypes => {
    return {
        type: OPEN_LOGIN,
    }
}

export const closeLogin = (): DialogActionTypes => {
    return {
        type: CLOSE_LOGIN,
    }
}
