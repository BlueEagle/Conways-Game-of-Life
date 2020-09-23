import React from "react";
// import logo from "./logo.svg";
import GameGrid from "./components/GameGrid";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>

        <GameGrid />
      </header>
      <section></section>
      <footer>Created with ❤ by Collin Ballou.</footer>
    </div>
  );
}

export default App;
