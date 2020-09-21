import React from "react";
import styled from "styled-components";

const alive = true;
const dead = false;

// const nowBuffer = [25][25];
let test = [];
for (let i = 0; i <= 25; i++) {
  test.push(i);
}

let nowBuffer = [];
for (let i = 0; i < 25; i++) {
  nowBuffer[i] = [];
  for (let j = 0; j < 25; j++) {
    nowBuffer[i][j] = i + j;
  }
}

const GameGrid = () => {
  return (
    <>
      {nowBuffer.map((row) => (
        <Row>
          {row.map((cell) => {
            return <Cell>{cell}</Cell>;
          })}
        </Row>
      ))}
    </>
  );
};

export default GameGrid;

const Cell = styled.div`
  width: 2rem;
  border: 1px solid black;
`;

const Row = styled.div`
  background-color: red;
  display: flex;
`;
