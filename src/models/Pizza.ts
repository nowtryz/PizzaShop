import { Schema, Document } from 'mongoose'
import Product from './Product';
import {Pizza} from "../types/models";

export default Product.discriminator<Pizza & Document>('Pizza', new Schema({
    ingredients: {
        type: [String],
        default: [],
    },
    allergen: {
        type: [String],
        default: [],
    },
}));

