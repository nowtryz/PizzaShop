import {Booking} from 'pizza-shop-commons/models'
import {ApiBooking} from "pizza-shop-commons/api"
import axios from "./axios"


export const createBooking = async (booking: Booking): Promise<ApiBooking> => {
    // we throw all errors, let the caller handle errors
    const response = await axios.post('/booking', booking);
    return response.data as ApiBooking
}