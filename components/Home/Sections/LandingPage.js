import { useMediaQuery } from "react-responsive";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Typography } from "@material-ui/core";
import Lottie from "react-lottie";
import animationData from "../../Utils/lottie/lt2.json";
function LandingPage() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Container>
      <Content>
        <Row>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Title>CRYPTO FLASH</Title>
            <Para>
              Crypto Portfolio Tracker using the WazirX API. Manage your
              Profits, Losses, Valuation, Transaction and Assets all at one
              place.
            </Para>
          </motion.div>
        </Row>
        <Lottie options={defaultOptions} height={600} width={600} />
      </Content>
    </Container>
  );
}

export default LandingPage;

//Styles

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 80vh;
  border-radius: 20px;
  @media (max-width: 1224px) {
    width: 100%;
    height: 400px;
  }
`;
const Content = styled.div`
  display: flex;
  padding-top: 200px;
  padding-left: 100px;
  @media (max-width: 1224px) {
    padding-top: 20px;
    padding-left: 50px;
  }
`;
const Row = styled.div`
  @media (max-width: 1224px) {
    padding-top: 100px;
  }
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
    font-size: 30px;
  }
`;
