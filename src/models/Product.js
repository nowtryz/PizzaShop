import { Schema } from 'mongoose'

export default mongoose.model('Product', new Schema({
    name : String,
    price : Number,
        }));

