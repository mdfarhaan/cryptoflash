import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

function ChartContent(props) {
  const data = {
    labels: props.legend,

    datasets: [
      {
        data: props.legendData,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Container>
      <Title>Coin</Title>
      {props.dataExist == false && (
        <center>
          <NoDataText>No Data</NoDataText>
        </center>
      )}
      <ChartContainer>
        <Doughnut data={data} options={options} />
      </ChartContainer>
    </Container>
  );
}

export default ChartContent;

//Styles
const Container = styled.div``;
const ChartContainer = styled.div`
  padding: 20px;
  padding-top: 5px;
`;
const Title = styled(Typography)`
  font-size: 45px;
  font-weight: bold;
  color: white;
  padding-left: 20px;
  color: ${(props) => props.theme.text};
`;
const NoDataText = styled(Typography)`
  color: ${(props) => props.theme.text};
  font-size: 20px;
`;
