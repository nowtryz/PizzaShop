import { Schema } from 'mongoose'
import mongoose from 'mongoose'

export const ProductSchema = new Schema({
    name : String,
    price : Number,
})

export default mongoose.model('Product', ProductSchema);

