import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pizza from "./components/pizza";
import ButtonBases from "./components/carrousel";
import ButtonBasesP from "./components/carrouselP";
import ImageBases from "./components/image";
import ButtonAppBar from "./components/appBar";

function App() {
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <ImageBases></ImageBases>
      <header className="App-header">
      <h1>Bienvenue sur notre super site de Pizzeria</h1>
      <ButtonBases></ButtonBases>


      <p>Venez Déguster nos nouveautés</p>
      <ButtonBasesP></ButtonBasesP>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Pizza ingredients={['tomates', 'mozzarella', 'emmental', 'chèvre', 'bleu']} name="Pizza 4 Fromages" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
