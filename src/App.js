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
      <section
        style={{
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>About</h2>
        <h3>Summary</h3>
        <p>
          The Game of Life is a cellular automation created by John Horton
          Conway in 1970. Though it is considered a game, it does not require
          any action from the player during the game. It runs like a simulation
          based on an initial state. Beginning with an initial state, the
          landscape changes as cells interact from one generation to the next in
          the simulation. These interactions are defined by a simple set of
          rules.
        </p>
        <h3>Rules</h3>
        <p>
          1. A cell with less than two living neighbors dies. (underpopulation)
        </p>
        <p>2. A cell with two or three neighbors lives.</p>
        <p>3. A cell with more than three neighbors dies. (overpopulation)</p>
        <p>
          4. A cell with three neighbors becomes alive if it is not already.
          (reproduction)
        </p>
      </section>
      <footer>Created with ❤ by Collin Ballou.</footer>
    </div>
  );
}

export default App;
