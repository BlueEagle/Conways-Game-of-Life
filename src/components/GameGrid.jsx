import React, { useState } from "react";
import styled from "styled-components";

let initialBuffer = [];
for (let i = 0; i < 25; i++) {
  initialBuffer[i] = [];
  for (let j = 0; j < 25; j++) {
    initialBuffer[i][j] = 0;
  }
}

const GameGrid = () => {
  // eslint-disable-next-line
  const [nowBuffer, setBuffer] = useState(initialBuffer);

  return (
    <>
      {nowBuffer.map((row, rowIndex) => (
        <Row>
          {row.map((ell, cellIndex) => {
            return <div key={`${row}-${ell}`}></div>;
          })}
        </Row>
      ))}
    </>
  );
};

export default GameGrid;

const Row = styled.div`
  background-color: lightgray;
  display: flex;
  align-items: center;
`;
