import {model, Schema} from "mongoose";
import {ProductSchema} from "./Product";

export default model("Order", new Schema({
    products: [ProductSchema],
    taken: Date,
    estimation: Date,
    prepared: {
        type: Date,
        default: null,
    }
}))
