import {Document, model, Schema} from 'mongoose'
import Pizza from "./Pizza";
import {Category} from "@pizza-shop/common";


export default model<Category & Document>('Category', new Schema({
    name: String,
    pizzas : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Pizza'
        }],
        default: [],
    },
}))
