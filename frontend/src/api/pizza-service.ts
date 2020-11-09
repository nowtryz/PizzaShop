import {Pizza} from 'pizza-shop-commons/models';
import axios from "./axios";
import {ApiDocument} from "../types/api";


export const createPizza = async (pizza: Pizza): Promise<Pizza & ApiDocument> => {
    // we throw all errors, let the caller handle errors
    const response = await axios.post('/pizze', pizza);
    return response.data as Pizza & ApiDocument
}
