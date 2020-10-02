import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Client', new Schema({
    name : String,
    surname : String,
    email : String,
    pwd : String,
    loyaltyPoint : Number,
    orders : [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    bookings : [{type: Schema.Types.ObjectId, ref : 'Bookings'}],
}));
