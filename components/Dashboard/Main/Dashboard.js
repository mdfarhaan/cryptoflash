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
import DataCards from "./DataCards";
import LoadingData from "../../Utils/LoadingData";

function Dashboard() {
  //Data
  const [user] = useAuthState(auth);
  const price_base_url = "https://cryptoflash-web-api.herokuapp.com/api/";
  const dataRef = db.collection("data").doc(user.uid);
  const [dataExist, setDataExist] = useState(true);
  const [data, setData] = useState([]);

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
      });
    });
  }, [data]); //data

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
            <DataCards
              dataExist={dataExist}
              onAddTransaction={onAddTransaction}
            />
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
const FormContainer = styled.div`
  display: grid;
  place-items: center;
  height: 90vh;
`;
const Content = styled.div`
  display: flex;
  margin-left: 300px;

  @media (max-width: 1224px) {
    padding-left: 0px;
  }
`;
const LoadingDataContainer = styled(Modal)`
  backdrop-filter: blur(8px);
`;
