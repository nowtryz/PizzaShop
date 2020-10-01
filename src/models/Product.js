import { Schema } from 'mongoose'
import mongoose from 'mongoose'

export default mongoose.model('Product', new Schema({
    name : String,
    price : Number,
        }));

