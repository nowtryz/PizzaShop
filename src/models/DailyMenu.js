import { Schema } from 'mongoose'
import Pizza from './Pizza';
import Product from './Product';
import SimpleProduct from './SimpleProduct';



export default Product.discriminator('DailyMenu', new Schema({
    starter : SimpleProduct,
    pizza : Pizza,
    dessert : SimpleProduct,
}));