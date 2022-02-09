import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function Cube(props) {
  return (
    <Container>
      <Title>Profit</Title>
      <Price>{"₹" + props.profit}</Price>
      <ValueDiv>
        <Value></Value>
        {/* <ArrowUpwardIcon style={{ fill: "white" }} /> */}
      </ValueDiv>
    </Container>
  );
}

export default Cube;

// Styles

const Container = styled.div`
  background-color: ${(props) => props.theme.card};
  border-radius: 20px;
  width: 185px;
  align-items: center;
  padding: 15px;
  padding-top: 25px;
  height: 185px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  @media (max-width: 950px) {
    width: 150px;
    height: 150px;
  }
`;
const Title = styled(Typography)`
  font-size: 40px;
  color: ${(props) => props.theme.text};
  @media (max-width: 950px) {
    font-size: 30px;
  }
`;
const Price = styled(Typography)`
  font-size: 42px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  @media (max-width: 950px) {
    font-size: 38px;
  }
`;
const ValueDiv = styled.div`
  display: flex;
`;
const Value = styled(Typography)`
  font-size: 25px;
  color: ${(props) => props.theme.text};
  @media (max-width: 950px) {
    font-size: 25px;
  }
`;
