import React from "react";
import styled from "styled-components";
import TransactionTable from "./Table/TransactionTable";
import Modal from "@material-ui/core/Modal";
import Bar from "../Navbar/Bar";

function Transaction() {
  return (
    <div style={{ position: "relative" }}>
      <Bar />
      <Container>
        <TransactionTable />
      </Container>
    </div>
  );
}

export default Transaction;

const Container = styled.div`
  display: grid;
  place-items: center;
  padding-top: 80px;
  width: 100%;

  @media (max-width: 1224px) {
    padding-top: 80px;
    padding-left: 50px;
    place-items: center;
  }
`;
