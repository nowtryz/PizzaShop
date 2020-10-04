import {Document, model, Schema} from 'mongoose'
import {Client} from "./types";
import './Booking'
import './Order'

const ClientSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    surname : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    pwd : {
        type: String,
        required: true,
    },
    loyaltyPoint : {
        type: Number,
        default: 0,
    },
})

ClientSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'client',
})

ClientSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'client',
})

export default model<Client & Document>('Client', ClientSchema)
