import React from "react";
// import logo from "./logo.svg";
import GameGrid from "./components/GameGrid";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameGrid />
      </header>
      <section></section>
      <footer>Created with ❤ by Collin Ballou.</footer>
    </div>
  );
}

export default App;
