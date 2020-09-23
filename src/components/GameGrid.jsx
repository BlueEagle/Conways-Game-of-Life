import React, { useState } from "react";
import styled from "styled-components";
import produce from "immer";

let initialBuffer = [];
for (let i = 0; i < 25; i++) {
  initialBuffer[i] = [];
  for (let j = 0; j < 25; j++) {
    initialBuffer[i][j] = false;
  }
}

const GameGrid = () => {
  // eslint-disable-next-line
  const [nowBuffer, setBuffer] = useState(initialBuffer);

  return (
    <>
      {nowBuffer.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((ell, cellIndex) => {
            return (
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  border: "1px solid darkgray",
                  backgroundColor: nowBuffer[rowIndex][cellIndex]
                    ? "red"
                    : undefined,
                }}
                key={`${rowIndex} - ${cellIndex}`}
                onClick={() => {
                  const nextBuffer = produce(nowBuffer, (currentCopy) => {
                    currentCopy[rowIndex][cellIndex] = !currentCopy[rowIndex][
                      cellIndex
                    ];
                  });
                  setBuffer(nextBuffer);
                  // nowBuffer[rowIndex][cellIndex] = !nowBuffer[rowIndex][
                  //   cellIndex
                  // ];
                  console.log(nowBuffer[rowIndex][cellIndex]);
                }}
              ></div>
            );
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
