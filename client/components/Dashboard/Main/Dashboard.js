import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import AddTransaction from "./AddTransaction";
import Bar from "../../Navbar/Bar";
import DataCards from "./DataCards";
import { APIEndpoints } from "../../config/Constants";
import { getPrice } from "../../../services/APIservices";

function Dashboard() {
  //Data
  const [user] = useAuthState(auth);
  const [price, setPrice] = useState([]);
  const [dataExist, setDataExist] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  //Fetch price every 5 sec
  // const interval = setInterval(async function () {
  //   const data = await getPrice();
  //   setPrice(data);
  // }, 3000);

  //Add user
  if (user) {
    db.collection("users").doc(user.uid).set({
      email: user.email,
      photoURL: user.photoURL,
    });
  }

  // Window Functions
  const [showData, setShowData] = useState(true);
  const [showFormContainer, setShowFormContainer] = useState(false);

  const onAddTransaction = () => {
    setShowData(false);
    setShowFormContainer(true);
  };

  const closeAddTransactionWindow = async () => {
    await fetchData();
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
              onAddTransaction={onAddTransaction}
              dataExist={dataExist}
              tableData={tableData}
              coins={coins}
              price={price}
              isLoading={isLoading}
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
  justify-content: center;
`;
