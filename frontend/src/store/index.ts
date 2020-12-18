import {combineReducers, compose, createStore} from "redux"
import dialogReducers from "./dialog/reducers"
import orderReducers from "./order/reducers"
import userReducers from "./user/reducers"

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reducers = combineReducers({
    order: orderReducers,
    dialog: dialogReducers,
    user: userReducers,
})

export default createStore(
    reducers,
    composeEnhancers()
)

export type RootState = ReturnType<typeof reducers>
