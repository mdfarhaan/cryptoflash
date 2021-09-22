import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Typography } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";

function LandingPage() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  return (
    <Container>
      <Content>
        {isTabletOrMobile && (
          <Image src="https://i.ibb.co/9qB16T1/Assets-Mockup.png"></Image>
        )}
        <Row>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Title>Assets</Title>
            <Para>View all your crypto assets at one place.</Para>
            {isDesktopOrLaptop && (
              <Para>
                Each card shows the total crypto currency and the value of the
                asset.
              </Para>
            )}
          </motion.div>
        </Row>
        {isDesktopOrLaptop && (
          <motion.div whileHover={{ scale: 1.1 }}>
            <DesktopImg>
              <Image src="https://i.ibb.co/9qB16T1/Assets-Mockup.png"></Image>
            </DesktopImg>
          </motion.div>
        )}
      </Content>
    </Container>
  );
}

export default LandingPage;

//Styles

const Container = styled.div`
  height: 80vh;
  background-color: #fafafa;
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
const Row = styled.div``;
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
  padding-left: 60px;
`;
