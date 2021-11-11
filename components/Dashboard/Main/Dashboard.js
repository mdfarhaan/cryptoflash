import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import Cube from "../Cube/Cube";
import Table from "../Table/Table";
import AddTransaction from "./AddTransaction";
import Chart from "../Chart/Chart";
import coinData from "../../Utils/coinData";
import Bar from "../../Navbar/Bar";
import Modal from "@material-ui/core/Modal";
import LoadingData from "../../Utils/LoadingData";

function Dashboard(props) {
  //Data
  const [user] = useAuthState(auth);
  const price_base_url = "https://cryptoflash-api.herokuapp.com/api/";
  const dataRef = db.collection("data").doc(user.uid);
  const [dataExist, setDataExist] = useState(true);
  const [data, setData] = useState([]);
  //Table
  const tableRef = db.collection("table").doc(user.uid);
  const [tableData, setTableData] = useState([]);
  //Cube
  const [cubeValue, setCubeValue] = useState(0);
  const [cubeProfit, setCubeProfit] = useState(0);
  const [cubeMostProfitCoin, setCubeMostProfitCoin] = useState();
  const [cubeMostProfit, setCubeMostProfit] = useState(0);
  const [cubeLeastProfitCoin, setCubeLeastProfitCoin] = useState();
  const [cubeLeastProfit, setCubeLeastProfit] = useState(0);
  //Chart
  const [chartCoinName, setChartCoinName] = useState([]);
  const [chartCoinData, setChartCoinData] = useState([]);
  const [chartProfitData, setChartProfitData] = useState([]);
  const [chartValueData, setChartValueData] = useState([]);

  //Add user
  if (user) {
    db.collection("users").doc(user.uid).set({
      email: user.email,
      photoURL: user.photoURL,
    });
  }

  //Fetch Coin Price from API
  const fetchPrice = async (coin) => {
    const url = price_base_url + coin.toLowerCase();
    try {
      const response = await fetch(url);
      const APIdata = await response.json();
      return APIdata["price"];
    } catch (error) {
      console.error(error);
    }
  };

  //Get data from database
  useEffect(() => {
    var dataArray = [];
    dataRef.get().then((doc) => {
      if (doc.exists) {
        doc.data().subcollection.forEach((collection) => {
          dataRef.collection(collection).onSnapshot((snapshot) => {
            dataArray.push(snapshot.docs.map((doc) => doc.data()));
            setTimeout(() => {
              setData(dataArray);
            }, 500);
          });
        });
      } else {
        //Data does not exist
        setDataExist(false);
      }
    });
  }, []);

  //Calculate and set data to table collection
  useEffect(() => {
    data.forEach((coinObj) => {
      var Holdings = 0; //current Coin holdings
      var Value = 0; //totalSpent

      coinObj.forEach((coinDoc) => {
        var coinDetails = coinData[coinDoc.coin];

        fetchPrice(coinDetails.symbol).then((price) => {
          if (coinDoc.transaction == "Buy") {
            Holdings = Holdings + coinDoc.quantity;
            Value = Value + coinDoc.totalSpent;
          } else {
            Holdings = Holdings - coinDoc.quantity;
            Value = Value - coinDoc.totalSpent;
          }

          if (Number(Holdings) === Holdings && Holdings % 1 === 0) {
            Holdings = parseInt(Holdings);
          } else {
            Holdings = parseFloat(Holdings.toFixed(6));
          }
          setTimeout(() => {
            // Update TableCoinData
            db.collection("table")
              .doc(user.uid)
              .collection(coinDoc.coin)
              .doc("TableCoinData")
              .set({
                name: coinDoc.coin,
                img: coinDetails.img,
                symbol: coinDetails.symbol,
                price: price, //current price
                day: 1.8, //API
                holdings: Holdings, // current holdings
                value: Holdings * price, //current value
                pandl: Holdings * price - Value, //current profit
              });
          });
        }, 1000);
      });
    });
  }, []); //data

  //Fetch Coin Data from Table collection
  const fetchTableData = () => {
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
    fetchTableData();
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

  // //Fetch Chart Data
  useEffect(() => {
    var coinName = [];
    var coinArray = [];
    var profitArray = [];
    var valueArray = [];
    tableData.forEach((doc) => {
      coinName.push(doc.name);
      coinArray.push(doc.holdings);
      profitArray.push(doc.pandl.toFixed(0));
      valueArray.push(doc.value.toFixed(0));
    });
    setTimeout(() => {
      setChartCoinName(coinName);
      setChartCoinData(coinArray);
      setChartProfitData(profitArray);
      setChartValueData(valueArray);
    }, 2000);
  }, [tableData]);

  // Window Functions
  const [showData, setShowData] = useState(true);
  const [showFormContainer, setShowFormContainer] = useState(false);
  const [showLoadingData, setShowLoadingData] = useState(true);

  const modalClose = () => {
    setShowLoadingData(false);
  };
  const onAddTransaction = () => {
    setShowData(false);
    setShowFormContainer(true);
  };

  const closeAddTransactionWindow = () => {
    setShowData(true);
    setShowFormContainer(false);
  };

  return (
    <>
      <Container>
        <Bar />
        {showData && (
          <Content>
            {setTimeout(() => {
              modalClose();
            }, 6000)}
            <LoadingDataContainer open={showLoadingData} onClose={modalClose}>
              <LoadingData />
            </LoadingDataContainer>
            <DataContainer>
              <Cube
                value={cubeValue}
                profit={cubeProfit}
                mostProfitCoin={cubeMostProfitCoin}
                mostProfit={cubeMostProfit}
                leastProfitCoin={cubeLeastProfitCoin}
                leastProfit={cubeLeastProfit}
                dataExist={dataExist}
              />
              <TableContainer>
                <Table
                  onAddTransaction={onAddTransaction}
                  tableData={tableData}
                  dataExist={dataExist}
                />
              </TableContainer>
            </DataContainer>
            <ChartContainer>
              <Chart
                coinLegend={chartCoinName}
                coinLegendData={chartCoinData}
                profitLegendData={chartProfitData}
                valueLegendData={chartValueData}
                dataExist={dataExist}
              />
            </ChartContainer>
          </Content>
        )}

        {showFormContainer && (
          <FormContainer>
            <AddTransaction
              onSubmit={closeAddTransactionWindow}
              onClose={closeAddTransactionWindow}
            />
          </FormContainer>
        )}
      </Container>
    </>
  );
}

export default Dashboard;

//Styles
const Container = styled.div``;
const DataContainer = styled.div`
  display: flex;
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
  padding-top: 23px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1224px) {
    width: 100%;
    padding-left: 40px;
    padding-right: 20px;
  }
`;
const FormContainer = styled.div`
  display: grid;
  place-items: center;
  height: 90vh;
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
const Content = styled.div`
  padding-left: 200px;
  @media (max-width: 1224px) {
    padding-left: 0px;
  }
`;
const LoadingDataContainer = styled(Modal)`
  backdrop-filter: blur(8px);
`;
