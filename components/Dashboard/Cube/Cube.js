import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Profit from "./Profit";
import Value from "./Value";
import MostProfit from "./MostProfit";
import MostLoss from "./MostLoss";

export default function Cube(props) {
  return (
    <Container>
      <Row1>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Profit profit={props.profit} />
        </motion.div>

        <LeftDiv>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Value value={props.value} />
          </motion.div>
        </LeftDiv>
      </Row1>
      <Row2>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <MostProfit coin={props.mostProfitCoin} profit={props.mostProfit} />
        </motion.div>

        <LeftDiv>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MostLoss coin={props.leastProfitCoin} profit={props.leastProfit} />
          </motion.div>
        </LeftDiv>
      </Row2>
    </Container>
  );
}

// Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media screen and (max-width: 1224px) {
    display: flex;
    flex-direction: column;
    place-items: center;
    justify-content: center;
    padding-top: 50px;
    padding-left: 40px;
  }
`;
const Row1 = styled.div`
  display: flex;
  padding: 10px;
`;
const Row2 = styled.div`
  display: flex;
  padding: 10px;
`;
const LeftDiv = styled.div`
  padding-left: 20px;
`;
