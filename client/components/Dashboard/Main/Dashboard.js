import React, { useState } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import AddTransaction from "./AddTransaction";
import Bar from "../../Navbar/Bar";
import DataCards from "./DataCards";

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
              onAddTransaction={onAddTransaction}
              onTransactionSubmit={onAddTransaction}
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
