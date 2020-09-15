import { Schema } from 'mongoose'

export const Schema = mongoose.model('Todo', new Schema({
    title : String,
    description : String,
    done : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
}));

export default class {
    constructor(title, description, done, createdAt) {
        this.title = title
        this.description = description
        this.done = done
        this.createdAt = createdAt
    }
}
