import {Document, model, Schema} from 'mongoose'
import Pizza from "./Pizza";
import {Category} from "../types/models";


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
