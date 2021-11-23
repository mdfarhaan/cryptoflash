import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import Cube from "../Cube/Cube";
import Table from "../Table/Table";
import Chart from "../Chart/Chart";

function DataCards(props) {
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
  //Chart Data
  const [chartCoinName, setChartCoinName] = useState([]);
  const [chartProfitData, setChartProfitData] = useState([]);
  const [chartValueData, setChartValueData] = useState([]);
  const [chartCoinData, setChartCoinData] = useState(0);

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

  //Fetch Chart Data
  useEffect(() => {
    var value = 0;
    var coinName = [];
    var profitArray = [];
    var valueArray = [];
    tableData.forEach((doc) => {
      value = value + doc.value;
      coinName.push(doc.name);
      profitArray.push(doc.pandl.toFixed(0));
      valueArray.push(doc.value.toFixed(0));
    });
    setTimeout(() => {
      setChartCoinName(coinName);
      setChartProfitData(profitArray);
      setChartValueData(valueArray);
      setChartCoinData(value);
    }, 2000);
  }, [tableData]);

  return (
    <Container>
      <DataContainer>
        <Cube
          dataExist={props.dataExist}
          cubeProfit={cubeProfit}
          cubeValue={cubeValue}
          cubeMostProfitCoin={cubeMostProfitCoin}
          cubeMostProfit={cubeMostProfit}
          cubeLeastProfitCoin={cubeLeastProfitCoin}
          cubeLeastProfit={cubeLeastProfit}
        />
        <ChartContainer>
          <Chart
            dataExist={props.dataExist}
            chartCoinData={chartCoinData}
            chartValueData={chartValueData}
            chartCoinName={chartCoinName}
            chartProfitData={chartProfitData}
          />
        </ChartContainer>
      </DataContainer>
      <TableContainer>
        <Table
          onAddTransaction={props.onAddTransaction}
          dataExist={props.dataExist}
          tableData={tableData}
        />
      </TableContainer>
    </Container>
  );
}

export default DataCards;

//Styles
const Container = styled.div`
  display: flex;
  @media (max-width: 1224px) {
    padding-left: 0px;
  }
`;
const DataContainer = styled.div`
  margin-top: 60px;
  padding: 60px;
  justify-content: center;
  @media (max-width: 1224px) {
    display: flex;
    justify-content: center;
    place-items: center;
    flex-direction: column;
  }
`;
const TableContainer = styled.div`
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1224px) {
    width: 100%;
    padding-left: 40px;
    padding-right: 20px;
  }
`;
const ChartContainer = styled.div`
  display: grid;
  padding: 10px;
  place-items: center;
  @media (max-width: 1224px) {
    padding-top: 35px;
    padding-left: 30px;
  }
`;
