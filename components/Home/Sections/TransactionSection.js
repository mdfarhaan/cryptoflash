import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function LandingPage() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  return (
    <Container>
      <Content>
        <motion.div whileHover={{ scale: 1.1 }}>
          <DesktopImg>
            <Image src="https://i.ibb.co/Sx4mrgR/Transaction-Mockup.png"></Image>
          </DesktopImg>
        </motion.div>

        <Row>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Title>Transaction</Title>
            <Para>View all your past transaction at one place.</Para>
            {isDesktopOrLaptop && (
              <Para>
                Easy to understand table to see your crypto currency
                transactions.
              </Para>
            )}
          </motion.div>
        </Row>
      </Content>
    </Container>
  );
}

export default LandingPage;

//Styles

const Container = styled.div`
  height: 80vh;
  background-color: white;
  @media (max-width: 1224px) {
    height: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  padding-top: 200px;
  padding-left: 100px;
  @media (max-width: 1224px) {
    display: grid;
    padding: 50px;
  }
`;
const Row = styled.div`
  text-align: right;
  @media (max-width: 1224px) {
    text-align: left;
  }
`;
const DesktopImg = styled.div`
  padding-left: 60px;
`;
const Title = styled(Typography)`
  font-size: 75px;
  font-weight: bold;
  @media (max-width: 1224px) {
    font-size: 80px;
  }
`;
const Para = styled(Typography)`
  font-size: 25px;
  @media (max-width: 1224px) {
    font-size: 35px;
  }
`;
const Image = styled.img`
  padding-right: 60px;
`;
