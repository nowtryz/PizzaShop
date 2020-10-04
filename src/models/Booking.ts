import {model, Document, Schema} from 'mongoose'
import {Booking} from "./types";

export default model<Booking & Document>('Booking', new Schema({
    date : {
        type: Date,
        default: Date.now,
    },
    peopleCount : {
        type: Number,
        required: true,
    },
    client: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Client',
    },
}))
