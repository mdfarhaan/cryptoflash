import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Profit from "./Profit";
import Value from "./Value";
import MostProfit from "./MostProfit";
import MostLoss from "./MostLoss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";

export default function Cube(props) {
  const [user] = useAuthState(auth);
  const dataRef = db.collection("data").doc(user.uid);
  const tableRef = db.collection("table").doc(user.uid);
  const [tableData, setTableData] = useState([]);
  //Cube
  const [cubeValue, setCubeValue] = useState(0);
  const [cubeProfit, setCubeProfit] = useState(0);
  const [cubeMostProfitCoin, setCubeMostProfitCoin] = useState();
  const [cubeMostProfit, setCubeMostProfit] = useState(0);
  const [cubeLeastProfitCoin, setCubeLeastProfitCoin] = useState();
  const [cubeLeastProfit, setCubeLeastProfit] = useState(0);

  const fetchData = () => {
    var dataArray = [];
    dataRef.get().then((doc) => {
      if (doc.exists) {
        doc.data().subcollection.forEach((collection) => {
          tableRef.collection(collection).onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
              dataArray.push(doc.data());
            });
            setTimeout(() => {
              setTableData(dataArray);
            }, 500);
          });
        });
      } else {
        setDataExist(false);
      }
    });
  };

  // Fetch Table Data
  useEffect(() => {
    fetchData();
  }, []);

  //Fetch Cube Data
  useEffect(() => {
    var value = 0;
    var profit = 0;
    var ProfitArray = [];
    //Most Profit
    var mostProfitcoin;
    var mostProfit = 0;
    //Least Profit
    var leastProfitcoin;
    var leastProfit = 0;
    tableData.forEach((doc) => {
      value = value + doc.value;
      profit = profit + doc.pandl;
      ProfitArray.push(doc.pandl.toFixed(0));
    });
    mostProfit = Math.max(...ProfitArray);
    leastProfit = Math.min(...ProfitArray);

    //Most and Least Profit
    tableData.forEach((doc) => {
      if (mostProfit == doc.pandl.toFixed(0)) {
        mostProfitcoin = doc.name;
      } else if (leastProfit == doc.pandl.toFixed(0)) {
        leastProfitcoin = doc.name;
      }
    });
    setTimeout(() => {
      setCubeValue(value.toFixed(0));
      setCubeProfit(profit.toFixed(0));
      setCubeMostProfitCoin(mostProfitcoin);
      setCubeMostProfit(mostProfit);
      setCubeLeastProfitCoin(leastProfitcoin);
      setCubeLeastProfit(leastProfit);
    }, 2000);
  }, [tableData]);

  return (
    <Container>
      <Row1>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Profit profit={cubeProfit} />
        </motion.div>

        <LeftDiv>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Value value={cubeValue} />
          </motion.div>
        </LeftDiv>
      </Row1>
      <Row2>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <MostProfit coin={cubeMostProfitCoin} profit={cubeMostProfit} />
        </motion.div>

        <LeftDiv>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MostLoss coin={cubeLeastProfitCoin} profit={cubeLeastProfit} />
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
