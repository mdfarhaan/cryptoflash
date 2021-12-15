import React, { useState } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import AddTransaction from "./AddTransaction";
import Bar from "../../Navbar/Bar";
import Modal from "@material-ui/core/Modal";
import DataCards from "./DataCards";
import LoadingData from "../../Utils/LoadingData";

function Dashboard() {
  //Data
  const [user] = useAuthState(auth);

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
            <DataCards onAddTransaction={onAddTransaction} />
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
