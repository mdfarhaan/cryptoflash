import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { APIEndpoints } from "../../config/Constants";

function AddTransaction(props) {
  const [transaction, setTransaction] = useState("Buy");
  const [coin, setCoin] = useState("Bitcoin");
  const [quantity, setQuantity] = useState(0);
  const [pricePerCoin, setPricePerCoin] = useState(0);
  const [date, setDate] = useState(null);
  // Firebase
  const [user] = useAuthState(auth);

  const submitHandler = async () => {
    try {
      if (quantity != 0 && pricePerCoin != 0 && date != null) {
        const reqOption = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transaction: transaction,
            coin: coin,
            quantity: quantity,
            pricePerCoin: pricePerCoin,
            date: date,
            totalSpent: quantity * pricePerCoin,
            uid: user.uid,
          }),
        };
        fetch(APIEndpoints.ADD_TRANSACTION, reqOption).then((response) => {
          response.json().then((res) => {
            if (res.status == 500) {
              alert("Transaction couldn't be added! Server Error!!");
            }
          });
        });
      } else {
        alert("Document Fields Invalid! Please enter all the required data.");
      }
    } catch (err) {
      console.log("objecterror");
      alert(err.message);
    }
    props.onSubmit();
  };

  // Dropdown Select
  const coins = [
    { value: "Bitcoin", label: "BTC" },
    { value: "Ethereum", label: "ETH" },
    { value: "Dogecoin", label: "DOGE" },
    { value: "Cardano", label: "ADA" },
    { value: "Solana", label: "SOL" },
    { value: "Ripple", label: "XRP" },
    { value: "Shibainu", label: "SHIB" },
    { value: "Matic", label: "MATIC" },
    { value: "Tether", label: "USDT" },
    { value: "Tron", label: "TRX" },
    { value: "Polkadot", label: "DOT" },
    { value: "Stellar", label: "XLM" },
    { value: "BasicAttentionToken", label: "BAT" },
  ];

  return (
    <div>
      <Icon>
        <IconButton onClick={() => props.onClose()}>
          <Close />
        </IconButton>
      </Icon>
      <Container>
        <Title>Add Transaction</Title>
        <form onSubmit={submitHandler}>
          <RadioDiv>
            <RadioGroup row defaultValue="Buy">
              <FormControlLabel
                value="Buy"
                onChange={(event) => {
                  setTransaction(event.target.value);
                }}
                control={<Radio color="primary"></Radio>}
                label="Buy"
              ></FormControlLabel>
              <FormControlLabel
                value="Sell"
                onChange={(event) => {
                  setTransaction(event.target.value);
                }}
                control={<Radio color="secondary"></Radio>}
                label="Sell"
              ></FormControlLabel>
            </RadioGroup>
          </RadioDiv>

          <FieldTitle>Coin</FieldTitle>
          <TextField
            id="outlined-select-currency"
            value={coin}
            select
            label=""
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setCoin(event.target.value);
            }}
          >
            {coins.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <InputRow>
            <div>
              <FieldTitle>Quantity</FieldTitle>
              <TextField
                id="outlined-basic"
                label=""
                type="text"
                variant="outlined"
                placeholder="0.00"
                onChange={(event) => {
                  setQuantity(parseFloat(event.target.value));
                }}
              />
            </div>

            <div style={{ paddingLeft: 10 }}>
              <FieldTitle>Price per Coin</FieldTitle>
              <TextField
                id="outlined-basic"
                label=""
                type="text"
                variant="outlined"
                placeholder="0.00"
                onChange={(event) => {
                  setPricePerCoin(parseFloat(event.target.value));
                }}
              />
            </div>
          </InputRow>

          <div style={{ paddingTop: 10 }}>
            <FieldTitle>Date & Time</FieldTitle>
            <TextField
              fullWidth
              id="datetime-local"
              type="datetime-local"
              defaultValue="2021-01-01T11:30"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>
          <div style={{ paddingTop: 10 }}>
            <FieldTitle>Total Spent</FieldTitle>
            <TotalContainer>
              <TotalSpentVal>
                {(quantity * pricePerCoin).toFixed(2)}
              </TotalSpentVal>
            </TotalContainer>
          </div>
          <div style={{ paddingTop: 15 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ paddingTop: 10 }}
              type="submit"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default AddTransaction;
// Styles
const Container = styled.div`
  padding: 20px;
  border-style: solid;
  background-color: white;
  border-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  @media (max-width: 1224px) {
    width: 300px;
  }
`;
const FieldTitle = styled(Typography)`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.transactionComponentText};
  @media (max-width: 1224px) {
    font-size: 15px;
  }
`;
const Title = styled(Typography)`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.transactionComponentText};
  @media (max-width: 1224px) {
    font-size: 20px;
  }
`;
const InputRow = styled.div`
  display: flex;
  padding-top: 10px;
`;
const RadioDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const TotalContainer = styled.div`
  background-color: whitesmoke;
  padding: 10px;
`;
const TotalSpentVal = styled(Typography)`
  font-size: 25px;
  font-weight: bold;
  @media (max-width: 1224px) {
    font-size: 20px;
  }
`;
const Icon = styled.div`
  display: grid;
  place-items: end;
`;
const Close = styled(CloseIcon)`
  color: ${(props) => props.theme.text};
`;
