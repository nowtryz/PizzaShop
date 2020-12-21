import React from "react"
import {GoogleLoginButton} from "react-social-login-buttons";
import {useDispatch} from "react-redux";
import openSignInWindow from "../../utils/pop-up";
import {signIn, startLoadingUser, stopLoadingUser} from "../../store/user/actions";
import axios from "../../api/axios";
import {ApiLogin} from "@pizza-shop/common";

const GoogleLogin = () => {
    const dispatch = useDispatch()

    const openSignIn = () => openSignInWindow(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/google`,
        'login to google',
        async event => {
            const {token} = event.data
            dispatch(startLoadingUser())

            try {
                const result = await axios.post<ApiLogin>('/sign-in', null,{headers: {
                        'Authorization': 'Bearer ' + token
                    }})

                const {user} = result.data
                dispatch(signIn(user))
            } catch (err) {
                dispatch(stopLoadingUser())
                console.log(err)
                // TODO show error to user
            }
        },
    )

    return (
        <GoogleLoginButton onClick={openSignIn} >
            Connexion avec Google
        </GoogleLoginButton>
    )
}

export default GoogleLogin
