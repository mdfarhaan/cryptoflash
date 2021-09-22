import React, { useState } from "react";
import styled from "styled-components";
import TransactionTable from "./Table/TransactionTable";
import Modal from "@material-ui/core/Modal";
import LoadingData from "../Utils/LoadingData";
import Bar from "../Utils/Sidebar/Bar";

function Transaction() {
  const [showLoadingData, setShowLoadingData] = useState(true);

  const modalClose = () => {
    setShowLoadingData(false);
  };
  return (
    <div>
      <Bar />
      {setTimeout(() => {
        modalClose();
      }, 2000)}
      <LoadingDataContainer open={showLoadingData} onClose={modalClose}>
        <LoadingData />
      </LoadingDataContainer>
      <Container>
        <TransactionTable />
      </Container>
    </div>
  );
}

export default Transaction;

const Container = styled.div`
  padding-left: 300px;
  padding-top: 80px;
  padding-right: 50px;
  @media (max-width: 1224px) {
    padding-top: 80px;
    padding-left: 50px;
    place-items: center;
  }
`;
const LoadingDataContainer = styled(Modal)`
  backdrop-filter: blur(8px);
`;
