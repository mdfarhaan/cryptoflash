import React from "react";
import styled from "styled-components";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
} from "@material-ui/core";
import coinData from "../../Utils/coinData";

function TableContent(props) {
  // console.log(props.tableData);
  //Table Contents
  const columns = [
    { id: "img", label: "", minWidth: 10, align: "center" },
    { id: "name", label: "Name", minWidth: 100, align: "center" },
    { id: "symbol", label: "", minWidth: 10, align: "center" },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      align: "center",
    },
    {
      id: "holdings",
      label: "Holdings",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(0),
    },
    {
      id: "value",
      label: "Value",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(2),
    },
    {
      id: "pandl",
      label: "Profit/Loss",
      minWidth: 100,
      align: "center",
      format: (value) => (0.0).toFixed(2),
    },
  ];

  return (
    <Paper>
      <Container>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <CellHeader
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </CellHeader>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.tableData.map((row, idx) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                  {columns.map((column) => {
                    const field = row[column.id];
                    const symbol = row.symbol;
                    const price =
                      props.price[`${symbol.toLowerCase()}inr`].last;
                    const img = coinData[row.coin].img;
                    const name = row.coin;
                    const holdings = row.holding;
                    const value = (holdings * price).toFixed(2);
                    const pandl = (value - row.invested).toFixed(2);
                    return (
                      <Cell key={column.id} align={column.align}>
                        {column.id === "img" ? (
                          <Avatar alt={name} src={img} />
                        ) : column.id === "name" ? (
                          name
                        ) : column.id === "price" ? (
                          "₹" + price
                        ) : column.id === "holdings" ? (
                          holdings
                        ) : column.id === "value" ? (
                          "₹" + value
                        ) : column.id === "pandl" ? (
                          "₹" + pandl
                        ) : (
                          field
                        )}
                      </Cell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {props.dataExist == false && (
          <center>
            <NoDataText>No Data</NoDataText>
          </center>
        )}
      </Container>
    </Paper>
  );
}

export default TableContent;
// Styles
const Container = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.card};
`;
const Cell = styled(TableCell)`
  color: ${(props) => props.theme.text};
`;
const CellHeader = styled(TableCell)`
  background-color: ${(props) => props.theme.card};
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;
const NoDataText = styled(Typography)`
  color: ${(props) => props.theme.text};
  font-size: 20px;
  padding: 10px;
`;
