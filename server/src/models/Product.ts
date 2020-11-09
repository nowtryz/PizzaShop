import {Document, model, Schema} from 'mongoose'
import {Product} from "pizza-shop-commons/models";

export const ProductSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
})

export default model<Product & Document>('Product', ProductSchema);
