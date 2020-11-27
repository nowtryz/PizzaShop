import React from 'react';
import './App.css';
import ButtonBasesP from "./components/carrouselP";
import ImageBases from "./components/image";
import ButtonAppBar from "./components/appBar";
import PizzaForm from "./components/pizza-form";
import PizzaList from "./components/home-pizza-list";


function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <ImageBases/>
      <header className="App-header">
        <ButtonBasesP/>
        <PizzaList />
        <PizzaForm />
      </header>
    </div>
  );
}

export default App;
