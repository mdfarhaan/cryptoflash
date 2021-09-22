import React, { useState } from "react";
import styled from "styled-components";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import CoinChart from "./CoinChart";
import ProfitChart from "./ProfitChart";
import ValueChart from "./ValueChart";

function Chart(props) {
  const [showCoinChart, setShowCoinChart] = useState(true);
  const [showProfitChart, setShowProfitChart] = useState(false);
  const [showValueChart, setShowValueChart] = useState(false);

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
        <RadioGroup row defaultValue="Coin">
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
            legendData={props.coinLegendData}
            legend={props.coinLegend}
            dataExist={props.dataExist}
          />
        )}
        {showValueChart && (
          <ValueChart
            legendData={props.valueLegendData}
            legend={props.coinLegend}
            dataExist={props.dataExist}
          />
        )}
        {showProfitChart && (
          <ProfitChart
            legendData={props.profitLegendData}
            legend={props.coinLegend}
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
