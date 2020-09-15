import {model, Schema} from "mongoose";

export default model("Order", new Schema({
    products: [Schema.ObjectId],
    taken: Date,
    estimation: Date,
    prepared: {
        type: Date,
        default: null,
    }
}))
