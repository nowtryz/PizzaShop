import {ApiClient} from "@pizza-shop/common"

export const LOADING_USER = "loading_user"
export const STOP_LOADING_USER = "stop_loading_user"
export const SET_USER = "set_user"
export const SIGN_OUT = "sign out"


export interface LoadUserAction {
    type: typeof LOADING_USER
}

export interface StopLoadingUserAction {
    type: typeof STOP_LOADING_USER
}

export interface SignInAction {
    type: typeof SET_USER
    payload: ApiClient
}

export interface SignOutAction {
    type: typeof SIGN_OUT
}

export type UserActionTypes =
    LoadUserAction |
    StopLoadingUserAction |
    SignInAction |
    SignOutAction
