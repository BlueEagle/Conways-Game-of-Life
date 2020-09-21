import React from "react";

const alive = true;
const dead = false;

const nowBuffer = [25][25];
for (const row in nowBuffer) {
  for (const cell in row) {
    cell = dead;
  }
}

const DisplayCells = () => {
  return <>{"test"}</>;
};

const GameGrid = () => {
  return (
    <>
      <DisplayCells />
    </>
  );
};

export default GameGrid;
