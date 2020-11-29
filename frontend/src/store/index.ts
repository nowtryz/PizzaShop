import {combineReducers, compose, createStore} from "redux"
import orderReducers from "./order/reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reducers = combineReducers({
    order: orderReducers,
})

export default createStore(
    reducers,
    composeEnhancers()
)

export type RootState = ReturnType<typeof reducers>
