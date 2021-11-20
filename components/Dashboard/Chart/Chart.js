import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import styled from "styled-components";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import CoinChart from "./CoinChart";
import ProfitChart from "./ProfitChart";
import ValueChart from "./ValueChart";

function Chart(props) {
  const [user] = useAuthState(auth);
  const dataRef = db.collection("data").doc(user.uid);
  const tableRef = db.collection("table").doc(user.uid);
  const [tableData, setTableData] = useState([]);
  //Chart Data
  const [chartCoinName, setChartCoinName] = useState([]);
  const [chartProfitData, setChartProfitData] = useState([]);
  const [chartValueData, setChartValueData] = useState([]);
  const [chartCoinData, setChartCoinData] = useState(0);
  //Chart
  const [showCoinChart, setShowCoinChart] = useState(false);
  const [showProfitChart, setShowProfitChart] = useState(true);
  const [showValueChart, setShowValueChart] = useState(false);

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

  // //Fetch Chart Data
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

  function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  function enableScrolling() {
    window.onscroll = function () {};
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <Container>
      <RadioDiv>
        <RadioGroup row defaultValue="Profit">
          <FormControlLabel
            value="Profit"
            label=""
            labelPlacement="top"
            onChange={() => {
              setShowCoinChart(false);
              setShowProfitChart(true);
              setShowValueChart(false);
              disableScrolling();
              sleep(300).then(() => {
                enableScrolling();
              });
            }}
            control={<Radio color="primary"></Radio>}
          ></FormControlLabel>
          <FormControlLabel
            value="Coin"
            label=""
            labelPlacement="top"
            onChange={() => {
              setShowCoinChart(true);
              setShowProfitChart(false);
              setShowValueChart(false);
              disableScrolling();
              sleep(300).then(() => {
                enableScrolling();
              });
            }}
            control={<Radio color="primary"></Radio>}
          ></FormControlLabel>
          <FormControlLabel
            value="Value"
            label=""
            labelPlacement="top"
            onChange={() => {
              setShowCoinChart(false);
              setShowProfitChart(false);
              setShowValueChart(true);
              disableScrolling();
              sleep(300).then(() => {
                enableScrolling();
              });
            }}
            control={<Radio color="primary"></Radio>}
          ></FormControlLabel>
        </RadioGroup>
      </RadioDiv>
      <div>
        {showCoinChart && (
          <CoinChart
            value={chartCoinData}
            legendData={chartValueData}
            legend={chartCoinName}
            dataExist={props.dataExist}
          />
        )}
        {showValueChart && (
          <ValueChart
            legendData={chartValueData}
            legend={chartCoinName}
            dataExist={props.dataExist}
          />
        )}
        {showProfitChart && (
          <ProfitChart
            legendData={chartProfitData}
            legend={chartCoinName}
            dataExist={props.dataExist}
          />
        )}
      </div>
    </Container>
  );
}

export default Chart;

// Styles
const Container = styled.div`
  background-color: ${(props) => props.theme.card};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
  width: 440px;
  @media (max-width: 1224px) {
    width: 320px;
  }
`;
const RadioDiv = styled.div`
  display: grid;
  justify-content: center;
`;
