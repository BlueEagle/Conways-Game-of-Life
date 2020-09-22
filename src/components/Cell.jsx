import React, { useState } from "react";
import styled from "styled-components";

const Cell = (props) => {
  const [location, setLocation] = useState([props.x, props.y]);
  const [alive, setAlive] = useState(false);

  const clickHandler = () => {
    setAlive(!alive);
  };

  return <StyledContainer alive={alive} onClick={clickHandler} />;
};

export default Cell;

const StyledContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid darkgray;
  background-color: ${(props) => (props.alive ? "black" : "none")};
`;
