import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import TransactionContent from "./TransactionContent";
import { Typography } from "@material-ui/core";

function Table() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <>
      <Container>
        {isDesktopOrLaptop && <Title>Transaction</Title>}
        {isTabletOrMobile && (
          <center>
            <Title>Transaction</Title>
          </center>
        )}
        <TransactionContent />
      </Container>
    </>
  );
}

export default Table;

// Styles
const Container = styled.div`
  background-color: ${(props) => props.theme.card};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
`;
const Title = styled(Typography)`
  color: ${(props) => props.theme.text};
  font-size: 35px;
  font-weight: bold;
  padding-left: 15px;
`;

//Styles

const MobileContainer = styled.div``;
const WebContainer = styled.div``;
