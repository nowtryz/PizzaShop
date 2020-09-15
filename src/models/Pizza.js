import { Schema } from 'mongoose'
import Product from './Product';



export default Product.discriminator('Pizza', new Schema({
    ingrédient : [String],
    allergene : [String],
}));

