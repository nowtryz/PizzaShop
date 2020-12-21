import {Document, model, Schema} from 'mongoose'
import {Product} from "@pizza-shop/common";

export const ProductSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    image : {
        type : String,
        required: false,
        default : '',
    },
})

export default model<Product & Document>('Product', ProductSchema);

