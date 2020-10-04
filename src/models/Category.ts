import {Document, model, Schema} from 'mongoose'
import Pizza from "./Pizza";
import Client from "./Client";
import {Category} from "./types";


export default model<Category & Document>('Client', new Schema({
    name: String,
    pizzas : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Pizza'
        }],
        default: [],
    },
}))
