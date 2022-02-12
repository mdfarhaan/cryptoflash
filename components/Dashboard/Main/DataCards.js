import React, { useState, useEffect } from "react";
import { APIEndpoints } from "../../config/Constants";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import Cube from "../Cube/Cube";
import Table from "../Table/Table";
import Chart from "../Chart/Chart";
import { getPrice } from "../../../services/APIservices";
import Loading from "../../Utils/Loading";

function DataCards({ onAddTransaction }) {
  const [isLoading, setIsLoading] = useState(true);
  //Table
  const [price, setPrice] = useState([]);
  const [user] = useAuthState(auth);
  const [dataExist, setDataExist] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [coins, setCoins] = useState([]);
  const [coinDoc, setCoinDoc] = useState([]);
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

  //Fetch Table Data from API
  const fetchData = async () => {
    await fetch(APIEndpoints.GET_DATA + user.uid).then((response) => {
      response.json().then((res) => {
        if (res.code == 404) {
          setDataExist(false);
        } else {
          setTableData(res.data);
          setCoins(res.coins);
        }
      });
    });
    const data = await getPrice();
    setPrice(data);
    setIsLoading(false);
  };

  //Fetch price every 5 sec
  // const interval = setInterval(async function () {
  //   const data = await getPrice();
  //   setPrice(data);
  // }, 3000);

  // Fetch Table Data
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let doc = [];
    coins?.length == undefined
      ? setCoinDoc([])
      : coins.length == 0
      ? setCoinDoc([])
      : coins.map((coin) => {
          doc.push(tableData[coin]);
        });
    setCoinDoc(doc);
  }, [isLoading]);

  //Fetch Cube Data
  useEffect(() => {
    var value = 0;
    var profit = 0;
    var profitArray = [];
    var coinName = [];
    var valueArray = [];
    //Most Profit
    var mostProfitcoin;
    var mostProfit = 0;
    //Least Profit
    var leastProfitcoin;
    var leastProfit = 0;
    coinDoc.map((doc) => {
      //Cube operations
      let currentVal =
        price[`${doc?.symbol.toLowerCase()}inr`]?.last * doc?.holding;
      let currentProfit = currentVal - doc.invested;
      value += currentVal;
      profit += currentProfit;
      profitArray.push(currentProfit.toFixed(0));
      //Chart operations
      coinName.push(doc.coin);
      valueArray.push(currentVal.toFixed(0));
    });
    mostProfit = Math.max(...profitArray);
    leastProfit = Math.min(...profitArray);

    //Most and Least Profit
    coinDoc.map((doc) => {
      let currentVal =
        price[`${doc?.symbol.toLowerCase()}inr`]?.last * doc?.holding;
      let currentProfit = currentVal - doc.invested;
      if (mostProfit == currentProfit.toFixed(0)) {
        mostProfitcoin = doc.coin;
      } else if (leastProfit == currentProfit.toFixed(0)) {
        leastProfitcoin = doc.coin;
      }
    });

    //Cube
    setCubeValue(value.toFixed(0));
    setCubeProfit(profit.toFixed(0));
    setCubeMostProfitCoin(mostProfitcoin);
    setCubeMostProfit(mostProfit);
    setCubeLeastProfitCoin(leastProfitcoin);
    setCubeLeastProfit(leastProfit);
    //Chart
    setChartCoinName(coinName);
    setChartProfitData(profitArray);
    setChartValueData(valueArray);
    setChartCoinData(value);
  }, [coinDoc]);

  coinDoc.sort((a, b) => {
    return b.value - a.value;
  });

  return (
    <Container>
      {!isLoading ? (
        <>
          <DataContainer>
            <Cube
              price={price}
              dataExist={dataExist}
              cubeProfit={cubeProfit}
              cubeValue={cubeValue}
              cubeMostProfitCoin={cubeMostProfitCoin}
              cubeMostProfit={cubeMostProfit}
              cubeLeastProfitCoin={cubeLeastProfitCoin}
              cubeLeastProfit={cubeLeastProfit}
            />
            <ChartContainer>
              <Chart
                price={price}
                dataExist={dataExist}
                chartCoinData={chartCoinData}
                chartValueData={chartValueData}
                chartCoinName={chartCoinName}
                chartProfitData={chartProfitData}
              />
            </ChartContainer>
          </DataContainer>
          <TableContainer>
            <Table
              price={price}
              onAddTransaction={onAddTransaction}
              dataExist={dataExist}
              tableData={coinDoc}
            />
          </TableContainer>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default DataCards;

//Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1420px) {
    display: block;
  }
  @media (max-width: 750px) {
    align-items: center;
    justify-content: center;
  }
`;
const DataContainer = styled.div`
  margin-top: 60px;
  padding: 60px;
  justify-content: center;
  @media (max-width: 1420px) {
    display: flex;
    padding-bottom: 0;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
    padding: 0px;
  }
  @media (max-width: 750px) {
    flex-direction: column;
    padding: 0px;
  }
`;
const TableContainer = styled.div`
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1420px) {
    margin-top: 20px;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 750px) {
    display: none;
  }
`;
const ChartContainer = styled.div`
  display: grid;
  padding: 10px;
  place-items: center;
`;
