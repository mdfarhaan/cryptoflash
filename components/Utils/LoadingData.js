import { ThreeBounce } from "better-react-spinkit";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import React from "react";

function LoadingData() {
  return (
    <Container>
      <center>
        <ThreeBounce size={50} />
        <Text>Loading Data</Text>
      </center>
    </Container>
  );
}

export default LoadingData;

//Styles
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const Text = styled(Typography)`
  font-size: 20px;
  padding: 30px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;
