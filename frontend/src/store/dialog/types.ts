export const OPEN_BOOKING = "open booking "
export const CLOSE_BOOKING = "close booking "
export const OPEN_ORDER = "open order "
export const CLOSE_ORDER = "close order "



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
    
export type DialogActionTypes =
        OpenOrderAction |
        CloseOrderAction|
        OpenBookingAction |
        CloseBookingAction
        