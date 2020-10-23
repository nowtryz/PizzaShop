import {model, Schema, Document} from "mongoose";
import {ProductSchema} from "./Product";
import {Order} from "../types/models";

export default model<Order & Document>("Order", new Schema({
    products: {
        type: [ProductSchema],
        required: true,
    },
    taken: {
        type: Date,
        default: Date.now,
    },
    estimation: {
        type: Date,
        required: true,
    },
    prepared: {
        type: Date,
        default: null,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
}))
