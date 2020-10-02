import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Booking', new Schema({
    date : Date,
    peopleCount : Number,
}));
