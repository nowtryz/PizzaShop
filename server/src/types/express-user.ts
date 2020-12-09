import {Client} from 'pizza-shop-commons/models'
import {Document} from 'mongoose';

declare global {
    namespace Express {
        // merge with password's User
        interface User extends Client, Document {}
    }
}
