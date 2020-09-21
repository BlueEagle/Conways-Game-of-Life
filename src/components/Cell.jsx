import React, { useState } from "react";
import styled from "styled-components";

const Cell = (props) => {
  const [location, setLocation] = useState([props.x, props.y]);

  return <StyledContainer />;
};

export default Cell;

const StyledContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid black;
`;
