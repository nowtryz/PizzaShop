import { Schema, Document } from 'mongoose'
import Product from './Product';
import {Pizza} from "@pizza-shop/common";

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

