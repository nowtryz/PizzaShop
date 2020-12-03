import {Pizza} from 'pizza-shop-commons/models'
import {ApiPizza} from "pizza-shop-commons/api"
import axios from "./axios"


export const createPizza = async (pizza: Pizza): Promise<ApiPizza> => {
    // we throw all errors, let the caller handle errors
    const response = await axios.post('/pizze', pizza);
    return response.data as ApiPizza
}
