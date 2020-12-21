import React, {useRef} from 'react';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import ButtonBasesP from "./components/carrouselP";
import ImageBases from "./components/image";
import ButtonAppBar from "./components/appBar";
import PizzaForm from "./components/pizza-form";
import PizzaList from "./components/home-pizza-list";
import OrderDialog from "./components/order-dialog";
import BookingDialog from './components/booking-dialog';
import GoogleLogin from "./components/login/google";
import './App.css';


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

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <ButtonAppBar orderRef={order}/>
                <ImageBases/>
                <header className="App-header">
                    <div>
                        <GoogleLogin />
                    </div>
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
