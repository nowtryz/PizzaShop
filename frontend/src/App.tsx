import React, {useRef} from 'react';
import './App.css';
import ButtonBasesP from "./components/carrouselP";
import ImageBases from "./components/image";
import ButtonAppBar from "./components/appBar";
import PizzaForm from "./components/pizza-form";
import PizzaList from "./components/home-pizza-list";
import OrderDialog from "./components/order-dialog";
import BookingDialog from './components/booking-dialog';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import openSignInWindow from "./utils/pop-up";
import {useDispatch} from "react-redux";
import axios from "./api/axios";
import {ApiLogin} from "pizza-shop-commons/api";
import {signIn, startLoadingUser, stopLoadingUser} from "./store/actions";
import {GoogleLoginButton} from "react-social-login-buttons";


const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#BFAFA6'
        }
    },
    typography: {
        fontFamily: "Lobster",
    },
})




const App = () => {
    const order = useRef<HTMLDivElement>(null)
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
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <ButtonAppBar orderRef={order}/>
                <ImageBases/>
                <header className="App-header">
                    <p>
                        <GoogleLoginButton onClick={openSignIn} text="Connexion avec Google"/>
                    </p>
                    <ButtonBasesP/>
                    <PizzaList ref={order} />
                    <PizzaForm />
                </header>
            </div>
            <OrderDialog />
            <BookingDialog/>
        </MuiThemeProvider>
    );
}

export default App;
