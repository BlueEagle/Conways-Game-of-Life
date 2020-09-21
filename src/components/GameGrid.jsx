import React, { useState, createContext } from "react";
import Cell from "./Cell";
import styled from "styled-components";

const Context = createContext();

const alive = true;
const dead = false;

let cellValues = {};
let initialBuffer = [];
for (let i = 0; i < 25; i++) {
  initialBuffer[i] = [];
  for (let j = 0; j < 25; j++) {
    cellValues[`(row: ${i}, col: ${j})`] = dead;
    initialBuffer[i][j] = cellValues[`(row: ${i}, col: ${j})`];
  }
}

const GameGrid = () => {
  // eslint-disable-next-line
  const [nowBuffer, setBuffer] = useState(initialBuffer);
  const [cells, setCells] = useState(cellValues);

  return (
    <>
      <Context.Provider value={(cells, setCells)}>
        {nowBuffer.map((row, rowIndex) => (
          <Row>
            {row.map((ell, cellIndex) => {
              return (
                <Cell x={rowIndex} y={cellIndex}>
                  {ell}
                </Cell>
              );
            })}
          </Row>
        ))}
      </Context.Provider>
    </>
  );
};

export default GameGrid;

const Row = styled.div`
  background-color: lightgray;
  display: flex;
  align-items: center;
`;
