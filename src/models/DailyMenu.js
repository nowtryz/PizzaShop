import { Schema } from 'mongoose'
import Pizza from './Pizza';
import Product from './Product';
import SimpleProduct from './SimpleProduct';



export default Product.discriminator('DailyMenu', new Schema({
    starter : { type: Schema.Types.ObjectId, ref: 'SimpleProduct' },
    pizza : { type: Schema.Types.ObjectId, ref: 'Pizza' },
    dessert : { type: Schema.Types.ObjectId, ref: 'SimpleProduct' },
}));