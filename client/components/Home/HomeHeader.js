import React from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

function HeaderHome(props) {
  return (
    <Container>
      <Navbar position="sticky">
        <Bar>
          <Title>CRYPTO FLASH</Title>
        </Bar>
      </Navbar>
    </Container>
  );
}

export default HeaderHome;

// Styles
const Container = styled.div`
  @media (max-width: 1224px) {
    width: 100%;
    position: fixed;
  }
`;

const Navbar = styled(AppBar)`
  margin: 0;
  background-color: #2b3038;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const Bar = styled(Toolbar)`
  justify-content: space-between;
  padding: 10px;
`;
const Title = styled(Typography)`
  font-size: 35px;
  font-weight: bold;
  color: #ececec;
  @media (max-width: 1224px) {
    font-size: 40px;
    width: 100%;
  }
`;
