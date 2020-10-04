import { Schema, Document } from 'mongoose'
import Pizza from './Pizza';
import Product from './Product';
import SimpleProduct from './SimpleProduct';
import {DailyMenu} from "./types";

export default Product.discriminator<DailyMenu & Document>('DailyMenu', new Schema({
    starter : {
        type: Schema.Types.ObjectId,
        ref: 'SimpleProduct',
        required: true,
    },
    pizza : {
        type: Schema.Types.ObjectId,
        ref: 'Pizza',
        required: true,
    },
    dessert : {
        type: Schema.Types.ObjectId,
        ref: 'SimpleProduct',
        required: true,
    },
}));
