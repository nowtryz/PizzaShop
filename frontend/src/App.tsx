import React from 'react';
import './App.css';
import ButtonBasesP from "./components/carrouselP";
import ImageBases from "./components/image";
import ButtonAppBar from "./components/appBar";
import PizzaForm from "./components/pizza-form";
import PizzaList from "./components/home-pizza-list";
import OrderDialog from "./components/order-dialog";
import BookingDialog from './components/booking-dialog';


const App = () => {
    return (
        <div className="App">
            <ButtonAppBar/>
            <ImageBases/>
            <header className="App-header">
                <ButtonBasesP/>
                <PizzaList />
                <PizzaForm />
            </header>
            <OrderDialog />
            <BookingDialog/>
        </div>
    );
}

export default App;
