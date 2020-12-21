import {Booking} from '@pizza-shop/common'
import {ApiBooking} from "@pizza-shop/common"
import axios from "./axios"


export const createBooking = async (booking: Booking): Promise<ApiBooking> => {
    // we throw all errors, let the caller handle errors
    const response = await axios.post('/booking', booking);
    return response.data as ApiBooking
}
