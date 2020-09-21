import React from "react";

// const alive = true;
// const dead = false;

// const nowBuffer = [25][25];
let test = [];
for (let i = 0; i <= 25; i++) {
  test.push(i);
}

let nowBuffer = [];
for (let i = 0; i < 25; i++) {
  nowBuffer.push(i);
}

const GameGrid = () => {
  return (
    <div>
      {nowBuffer.map((number) => (
        <div>{number}</div>
      ))}
    </div>
  );
};

export default GameGrid;
