import {model, Schema} from "mongoose";

export default model("Order", new Schema({
    products: { type: Schema.Types.ObjectId, ref: 'SimpleProduct' },
    taken: Date,
    estimation: Date,
    prepared: {
        type: Date,
        default: null,
    }
}))