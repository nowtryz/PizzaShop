import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pizza from "./components/pizza";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
