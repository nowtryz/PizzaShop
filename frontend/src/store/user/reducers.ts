import {
    LOADING_USER,
    STOP_LOADING_USER,
    SET_USER,
    SIGN_OUT,
    UserActionTypes
} from "./types";
import {ApiClient} from "@pizza-shop/common";

export type LoggedState = ApiClient & {
    logged: true
    loading: false
}

export type LoadingState = {
    logged: false
    loading: true
}

export type AnonymousState = {
    logged: false
    loading: false
}

export type UserState = LoggedState | LoadingState | AnonymousState

const defaultState: UserState = {
    logged: false,
    loading: false,
}


const userReducers = (userState: UserState = defaultState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case LOADING_USER:
            return {
                logged: false,
                loading: true,
            }
        case STOP_LOADING_USER:
        case SIGN_OUT:
            return {
                logged: false,
                loading: false,
            }
        case SET_USER:
            return  {
                logged: true,
                loading: false,
                ...action.payload
            }
        default:
            return userState
    }
}

export default userReducers
