import React from "react";
import styled from "styled-components";
import TransactionTable from "./Table/TransactionTable";
import Modal from "@material-ui/core/Modal";
import Bar from "../Navbar/Bar";

function Transaction() {
  return (
    <div>
      <Bar />
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
