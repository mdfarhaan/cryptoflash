import React, { useState, useEffect } from "react";
import { APIEndpoints } from "../../config/Constants";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import Cube from "../Cube/Cube";
import Table from "../Table/Table";
import Chart from "../Chart/Chart";
import { getPrice } from "../../../services/APIservices";

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

  // Fetch Table Data
  useEffect(() => {
    fetchData();
  }, []);

  const myCoin = ["Bitcoin", "Cardano", "Ethereum"];

  useEffect(() => {
    let doc = [];
    myCoin.map((coin) => {
      doc.push(tableData[coin]);
    });
    setCoinDoc(doc);
  }, [tableData]);

  // //Fetch Cube Data
  // useEffect(() => {
  //   var value = 0;
  //   var profit = 0;
  //   var ProfitArray = [];
  //   //Most Profit
  //   var mostProfitcoin;
  //   var mostProfit = 0;
  //   //Least Profit
  //   var leastProfitcoin;
  //   var leastProfit = 0;
  //   coinDoc.forEach((doc, idx) => {
  //     value =
  //       parseFloat(value) +
  //       parseFloat(
  //         price[`${doc?.symbol.toLowerCase()}inr`]?.last * doc?.holding
  //       ).toFixed(2);

  //     console.log(value);
  //     // value = value + doc.value;
  //     // profit = profit + doc.pandl;
  //     // ProfitArray.push(doc.pandl.toFixed(0));
  //   });
  //   mostProfit = Math.max(...ProfitArray);
  //   leastProfit = Math.min(...ProfitArray);

  //   //Most and Least Profit
  //   // coinDoc.forEach((doc) => {
  //   //   if (mostProfit == doc.pandl.toFixed(0)) {
  //   //     mostProfitcoin = doc.name;
  //   //   } else if (leastProfit == doc.pandl.toFixed(0)) {
  //   //     leastProfitcoin = doc.name;
  //   //   }
  //   // });
  //   // setTimeout(() => {
  //   //   setCubeValue(value.toFixed(0));
  //   //   setCubeProfit(profit.toFixed(0));
  //   //   setCubeMostProfitCoin(mostProfitcoin);
  //   //   setCubeMostProfit(mostProfit);
  //   //   setCubeLeastProfitCoin(leastProfitcoin);
  //   //   setCubeLeastProfit(leastProfit);
  //   // }, 2000);
  // }, [coinDoc]);

  // //Fetch Chart Data
  // useEffect(() => {
  //   var value = 0;
  //   var coinName = [];
  //   var profitArray = [];
  //   var valueArray = [];
  //   tableData.forEach((doc) => {
  //     value = value + doc.value;
  //     coinName.push(doc.name);
  //     profitArray.push(doc.pandl.toFixed(0));
  //     valueArray.push(doc.value.toFixed(0));
  //   });
  //   setTimeout(() => {
  //     setChartCoinName(coinName);
  //     setChartProfitData(profitArray);
  //     setChartValueData(valueArray);
  //     setChartCoinData(value);
  //   }, 2000);
  // }, [tableData]);

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
        <h1>Loading</h1>
      )}
    </Container>
  );
}

// export const getServerSideProps = async ({ res }) => {
//   try {
//     const result = await fetch(
//       `https://jsonplaceholder.typicode.com/todos/3`
//     ).then((response) => response.json());
//     console.log("result");
//     return {
//       props: {
//         data: result,
//       },
//     };
//   } catch {
//     res.statusCode = 404;
//     return {
//       props: {},
//     };
//   }
// };

export const getStaticProps = async () => {
  console.log("serverheda");
  return {
    props: {
      data: "from the server",
    }, // will be passed to the page component as props
  };
};

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
