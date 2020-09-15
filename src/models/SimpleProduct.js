import { Schema } from 'mongoose'
import Product from './Product';



export default Product.discriminator('SimpleProduct', new Schema({
    type : Enumerator("drink","starter","dessert")
}));

