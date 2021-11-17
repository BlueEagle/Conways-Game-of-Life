import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Cell = (props) => {
  const [location, setLocation] = useState([props.x, props.y]);
  const [alive, setAlive] = useState(false);
  const [cells, setCells] = props;

  useEffect(() => {
    setAlive(cells[`(row: ${props.x}, col: ${props.y})`]);
  }, cells[`(row: ${props.x}, col: ${props.y})`]);

  const clickHandler = () => {
    // setAlive(!alive);
    // setCells(...cells, cells[`(row: ${props.x}, col: ${props.y})`]: cells[`(row: ${props.x}, col: ${props.y})`];
    console.log(cells[`(row: ${props.x}, col: ${props.y})`]);
  };

  return (
    <StyledContainer
      alive={cells[`(row: ${props.x}, col: ${props.y})`]}
      onClick={clickHandler}
    />
  );
};

export default Cell;

const StyledContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid darkgray;
  background-color: ${(props) => (props.alive ? "black" : "none")};
`;
