import React from "react";
import { Circle } from "better-react-spinkit";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <center>
        <Circle color="#FFF" size={60}></Circle>
      </center>
    </LoadingContainer>
  );
}

export default Loading;

// Styles
const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  backdrop-filter: blur(8px);
  width: 80vw;
`;
