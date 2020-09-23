import React, { useState } from "react";
import { Button } from "@material-ui/core";
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
  const [simulationActive, setSimulationActive] = useState(false);

  const toggleSimulation = () => {
    setSimulationActive(!simulationActive);
  };

  return (
    <>
      <div style={{ border: "2px solid black" }}>
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
                      ? "navy"
                      : undefined,
                  }}
                  key={`${rowIndex} - ${cellIndex}`}
                  onClick={() => {
                    if (!simulationActive) {
                      const nextBuffer = produce(nowBuffer, (currentCopy) => {
                        currentCopy[rowIndex][cellIndex] = !currentCopy[
                          rowIndex
                        ][cellIndex];
                      });
                      setBuffer(nextBuffer);
                    }
                  }}
                ></div>
              );
            })}
          </Row>
        ))}
      </div>

      <ButtonDiv>
        <Button variant="contained" onClick={toggleSimulation}>
          {simulationActive ? "Stop" : "Start"}
        </Button>
      </ButtonDiv>
    </>
  );
};

export default GameGrid;

const Row = styled.div`
  background-color: lightgray;
  display: flex;
  align-items: center;
`;

const ButtonDiv = styled.div`
  padding: 1%;
`;
