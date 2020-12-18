import {
    LOADING_USER,
    STOP_LOADING_USER,
    SET_USER,
    SIGN_OUT,
    UserActionTypes
} from "./types";
import {ApiClient} from "pizza-shop-commons/api";


export const startLoadingUser = (): UserActionTypes => {
    return {
        type: LOADING_USER,
    }
}

export const stopLoadingUser = (): UserActionTypes => {
    return {
        type: STOP_LOADING_USER,
    }
}

export const signIn = (user: ApiClient): UserActionTypes => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const signOut = (): UserActionTypes => {
    return {
        type: SIGN_OUT
    }
}
