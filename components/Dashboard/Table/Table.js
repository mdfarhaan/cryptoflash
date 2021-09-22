import React from "react";
import styled from "styled-components";
import TableContent from "./TableContent";
import { Typography, Button } from "@material-ui/core";

function Table(props) {
  return (
    <Container>
      <Title>Assets</Title>
      <TableContent data={props.tableData} dataExist={props.dataExist} />
      <ButtonContainer>
        <AddButton
          variant="contained"
          color="primary"
          onClick={props.onAddTransaction}
        >
          Add Transaction
        </AddButton>
      </ButtonContainer>
    </Container>
  );
}

export default Table;

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.card};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
`;
const Title = styled(Typography)`
  color: ${(props) => props.theme.text};
  font-size: 35px;
  font-weight: bold;
  padding-left: 15px;
`;
const AddButton = styled(Button)`
  margin: 10px;
`;
const ButtonContainer = styled.div`
  display: grid;
  place-items: end;
`;
