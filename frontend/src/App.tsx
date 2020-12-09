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
import {Button} from "@material-ui/core";
import openSignInWindow from "./utils/pop-up";

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

const openSignIn = () => openSignInWindow(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/google`,
    'login to google'
)


const App = () => {
    const order = useRef<HTMLDivElement>(null);

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <ButtonAppBar orderRef={order}/>
                <ImageBases/>
                <header className="App-header">
                    <p>
                        <Button onClick={openSignIn}>Se connecter avec Google</Button>
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
