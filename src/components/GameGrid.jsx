import React, { useState, useRef, useCallback } from "react";
import { Button, Slider, Select, InputLabel } from "@material-ui/core";
import styled from "styled-components";
import produce from "immer";

const initialDimensions = 25;
const initialRows = initialDimensions;
const initialCols = initialDimensions;

let initialBuffer = [];
for (let i = 0; i < initialRows; i++) {
  initialBuffer[i] = [];
  for (let j = 0; j < initialCols; j++) {
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
  const [dimensions, setDimenions] = useState(initialDimensions);
  const [generation, setGeneration] = useState(1);
  const [stepSpeed, setStepSpeed] = useState(1000);
  const addGeneration = () => {
    setGeneration((g) => g + 1);
  };

  const simulationActiveRef = useRef(simulationActive);
  simulationActiveRef.current = simulationActive;
  const stepSpeedRef = useRef(stepSpeed);
  stepSpeedRef.current = stepSpeed;
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  const colsRef = useRef(cols);
  colsRef.current = cols;

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
    setTimeout(simulation, stepSpeedRef.current);
  }, [rows, cols]);

  const clearBuffer = () => {
    setBuffer((buffer) => {
      return produce(buffer, (copy) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            copy[i][j] = false;
          }
        }
      });
    });

    setSimulationActive(false);
    setGeneration(1);
  };

  const randomizeBuffer = () => {
    setBuffer((buffer) => {
      return produce(buffer, (copy) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            copy[i][j] = Math.floor(Math.random() * 10) > 5 ? true : false;
          }
        }
      });
    });

    setSimulationActive(false);
    setGeneration(1);
  };

  const speedChangeHandler = (e, value) => {
    setStepSpeed((speed) => value);
    stepSpeedRef.current = value;
  };

  const dimensionChangeHandler = (e) => {
    // console.log(e.target.value);
    setDimenions(e.target.value);
    setRows(e.target.value);
    rowsRef.current = e.target.value;
    setCols(e.target.value);
    colsRef.current = e.target.value;
    // console.log(rowsRef.current);

    setBuffer((buffer) => {
      let newBuffer = [];
      for (let i = 0; i < rowsRef.current; i++) {
        newBuffer[i] = [];
        for (let j = 0; j < colsRef.current; j++) {
          newBuffer[i][j] = false;
        }
      }
      return newBuffer;
    });
  };

  return (
    <>
      <h1 style={{ wordWrap: "normal", textAlign: "center" }}>
        Conway's Game of Life
      </h1>
      <div style={{ border: "2px solid black" }}>
        {nowBuffer.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((ell, cellIndex) => {
              return (
                <div
                  style={{
                    width: `${50 / dimensions}vw`,
                    height: `${50 / dimensions}vw`,
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

      <FeatureDiv style={{ display: "flex", justifyContent: "center" }}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => {
            setSimulationActive(!simulationActive);
            if (!simulationActive) {
              simulationActiveRef.current = true;
              simulation();
            }
          }}
        >
          {simulationActive ? "Stop" : "Start"}
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={clearBuffer}
        >
          Clear
        </StyledButton>
        <StyledButton variant="contained" onClick={randomizeBuffer}>
          Random
        </StyledButton>
      </FeatureDiv>
      <FeatureDiv>
        <label>Interval</label>
        <Slider
          color="primary"
          min={50}
          value={stepSpeed}
          max={2500}
          onChange={speedChangeHandler}
        />
        <InputLabel id="select-label">Dimensions</InputLabel>
        <Select
          native
          labelId="select-label"
          value={dimensions}
          onChange={dimensionChangeHandler}
        >
          <option value={25}>25 x 25</option>
          <option value={50}>50 x 50</option>
          <option value={100}>100 x 100</option>
        </Select>
      </FeatureDiv>
    </>
  );
};

export default GameGrid;

const Row = styled.div`
  background-color: lightgray;
  display: flex;
  align-items: center;
`;

const FeatureDiv = styled.div`
  padding: 1%;
  width: 60%;
`;

const StyledButton = styled(Button)`
  margin-left: 1rem !important;
  margin-right: 1rem !important;
`;

const GenerationTracker = styled.div`
  padding: 1%;
`;
