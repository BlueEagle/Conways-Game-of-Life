import React, { useState, useRef, useCallback } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import produce from "immer";

const initialRows = 25;
const initialCols = 25;

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
  // eslint-disable-next-line
  const [rows, setRows] = useState(initialRows);
  // eslint-disable-next-line
  const [cols, setCols] = useState(initialCols);
  const [generation, setGeneration] = useState(1);
  const addGeneration = () => {
    setGeneration((g) => g + 1);
  };

  const simulationActiveRef = useRef(simulationActive);
  simulationActiveRef.current = simulationActive;

  const simulation = useCallback(() => {
    if (!simulationActiveRef.current) return;

    setBuffer((buffer) => {
      return produce(buffer, (copy) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let neighbors = 0;
            const checkNeighbors = (newI, newJ) => {
              if (
                i + newI >= 0 &&
                i + newI < rows &&
                j + newJ >= 0 &&
                j + newJ < cols
              ) {
                if (buffer[i + newI][j + newJ]) neighbors++;
              }
            };
            checkNeighbors(0, 1);
            checkNeighbors(0, -1);
            checkNeighbors(-1, 0);
            checkNeighbors(1, 0);
            checkNeighbors(1, 1);
            checkNeighbors(-1, -1);
            checkNeighbors(-1, 1);
            checkNeighbors(1, -1);

            // console.log(`Cell: ${i} ${j} - has: ${neighbors}`);

            if (neighbors < 2 || neighbors > 3) {
              copy[i][j] = false;
            } else if (!buffer[i][j] && neighbors === 3) {
              copy[i][j] = true;
            }
          }
        }
      });
    });

    addGeneration();
    console.log(generation);
    setTimeout(simulation, 500);
  }, [rows, cols]);

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

      <GenerationTracker>Generation: {generation}</GenerationTracker>

      <ButtonDiv>
        <Button
          variant="contained"
          onClick={() => {
            setSimulationActive(!simulationActive);
            if (!simulationActive) {
              simulationActiveRef.current = true;
              simulation();
            }
          }}
        >
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

const GenerationTracker = styled.div`
  padding: 1%;
`;
