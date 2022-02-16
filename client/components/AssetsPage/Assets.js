import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { APIEndpoints } from "../config/Constants";
import AssetsCard from "./AssetsCard";
import Bar from "../Navbar/Bar";
import Loading from "../Utils/Loading";
import coinData from "../Utils/coinData";
import { getPrice } from "../../services/APIservices";

function Assets() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState([]);
  const [coins, setCoins] = useState([]);

  //Fetch Data
  const [user] = useAuthState(auth);
  const [tableData, setTableData] = useState([]);
  const [coinDoc, setCoinDoc] = useState([]);
  const [dataExist, setDataExist] = useState(true);

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

  const rows = [...Array(Math.ceil(coinDoc.length / 4))];

  const productRows = rows.map((row, idx) =>
    coinDoc.slice(idx * 4, idx * 4 + 4)
  );
  const Mobilerows = [...Array(Math.ceil(coinDoc.length / 2))];

  const MobileproductRows = Mobilerows.map((row, idx) =>
    coinDoc.slice(idx * 2, idx * 2 + 2)
  );

  return (
    <>
      <Bar />
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Title>Assets</Title>
            <Grid>
              {coinDoc.map((card) => {
                let currentPrice =
                  price[`${card?.symbol.toLowerCase()}inr`]?.last;
                return (
                  <motion.div key={card.coin} whileHover={{ scale: 1.1 }}>
                    <AssetsCard
                      key={card.coin}
                      name={card.coin}
                      img={coinData[card.coin].img}
                      holdings={card.holding}
                      value={currentPrice * card.holding}
                      symbol={card.symbol}
                    />
                  </motion.div>
                );
              })}
            </Grid>

            {!dataExist && (
              <center>
                <NoDataText>No Data</NoDataText>
              </center>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default Assets;

//Styles
const Container = styled.div`
  display: grid;
  place-items: center;
  padding-top: 60px;
  @media (max-width: 1224px) {
    padding-top: 80px;
  }
`;
const CardContainer = styled.div`
  display: flex;
`;
const Title = styled(Typography)`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;
const NoDataText = styled(Typography)`
  color: ${(props) => props.theme.text};
  font-size: 30px;
  padding: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  place-content: center;
  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 40%);
  }
  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 60%);
  }
`;
