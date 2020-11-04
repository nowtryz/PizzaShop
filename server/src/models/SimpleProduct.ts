import { Schema, Document } from 'mongoose'
import Product from './Product';
import {productTypeEnum, SimpleProduct} from "pizza-shop-commons/models";

export default Product.discriminator<SimpleProduct & Document>('SimpleProduct', new Schema({
    type : {
        type: String,
        enum: productTypeEnum,
        required: true,
    },
}));

