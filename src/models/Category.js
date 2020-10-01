import { Schema } from 'mongoose'

export default mongoose.model('Client', new Schema({
    name : String,
    pizzas : [{ type: Schema.Types.ObjectId, ref: 'Pizza' }],
        }));