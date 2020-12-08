import {Document, model, Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import {Client} from "pizza-shop-commons/models";
import './Booking'
import './Order'

interface IClient extends Client {
    comparePassword: (string) => boolean
}

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
        index: true,
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

// TODO drop password on serializations

// Hash the password before we even save it to the database
ClientSchema.pre<Client & Document>('save', async function(next) {
    const user: Client & Document = this;
    if (!user.isModified('pwd')) return next();

    try {
        const salt = await bcrypt.genSalt(10)
        user.pwd = await bcrypt.hash(user.pwd, salt, null);
        next();
    } catch (err) {
        return next(err)
    }
})

// compare password in the database and the one that the user type in
// Arrow functions explicitly prevent binding this, so the method will
// not have access to the document. Hence we use es5 function.
ClientSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default model<IClient & Document>('Client', ClientSchema)
