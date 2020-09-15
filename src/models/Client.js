import { Schema } from 'mongoose'

export default mongoose.model('Client', new Schema({
    name : String,
    surname : Number,
    email : String,
    pwd : String,
    loyaltyPoint :Number,
    listOfOrder : [Order]
        }));