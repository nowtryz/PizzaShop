import { Schema } from 'mongoose'

export default mongoose.model('Booking', new Schema({
    date : Date,
    nbpersons : Number,
        }));