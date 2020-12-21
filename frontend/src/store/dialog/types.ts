export const OPEN_BOOKING = "open booking "
export const CLOSE_BOOKING = "close booking "
export const OPEN_ORDER = "open order "
export const CLOSE_ORDER = "close order "
export const OPEN_LOGIN = "open login"
export const CLOSE_LOGIN = "close login"


export interface OpenBookingAction {
    type: typeof OPEN_BOOKING
}

export interface CloseBookingAction {
    type: typeof CLOSE_BOOKING
}

export interface OpenOrderAction {
    type: typeof OPEN_ORDER
}

export interface CloseOrderAction {
    type: typeof CLOSE_ORDER
}

export interface OpenLoginAction {
    type: typeof OPEN_LOGIN
}

export interface CloseLoginAction {
    type: typeof CLOSE_LOGIN
}

export type DialogActionTypes =
        OpenOrderAction |
        CloseOrderAction|
        OpenBookingAction |
        CloseBookingAction |
        OpenLoginAction |
        CloseLoginAction
