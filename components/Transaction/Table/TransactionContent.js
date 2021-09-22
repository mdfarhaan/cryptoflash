import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Typography,
} from "@material-ui/core";
import coinData from "../../Utils/coinData";

function TableContent() {
  //Data
  const [user] = useAuthState(auth);
  const dataRef = db.collection("data").doc(user.uid);
  const [tableData, setTableData] = useState([]);
  const [dataExist, setDataExist] = useState(true);

  // Fetch Table Data
  useEffect(() => {
    var dataArray = [];
    dataRef.get().then((doc) => {
      if (doc.exists) {
        doc.data().subcollection.forEach((collection) => {
          dataRef.collection(collection).onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
              dataArray.push(doc.data());
            });
            setTimeout(() => {
              setTableData(dataArray);
            }, 500);
          });
        });
      } else {
        setDataExist(false);
      }
    });
  }, []);

  tableData.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  //Table Contents
  const columns = [
    { id: "img", label: "", minWidth: 10, align: "center" },
    { id: "coin", label: "Name", minWidth: 100, align: "center" },
    { id: "symbol", label: "", minWidth: 10, align: "center" },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(0),
    },
    {
      id: "pricePerCoin",
      label: "Price Per Coin",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(0),
    },
    {
      id: "totalSpent",
      label: "Total Spent",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(0),
    },

    {
      id: "date",
      label: "Date",
      minWidth: 150,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "transaction",
      label: "Type",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  function createData(
    img,
    name,
    symbol,
    quantity,
    buyprice,
    totalspent,
    date,
    type
  ) {
    return { img, name, symbol, quantity, buyprice, totalspent, date, type };
  }

  const rows = [
    createData(
      "img",
      "Ethereum",
      "ETH",
      2,
      2500,
      5000,
      "Sat Aug 28 2021 01:51:23",
      "Buy"
    ),
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      const name = row.coin;
                      var coinDetails = coinData[name];
                      var date = new Date(row.date);
                      var dataFormat = date.toDateString();

                      return (
                        <Cell key={index} align={column.align}>
                          {column.id === "img" ? (
                            <Avatar alt={"name"} src={coinDetails.img} />
                          ) : column.id === "symbol" ? (
                            coinDetails.symbol
                          ) : column.id === "pricePerCoin" ? (
                            "₹" + column.format(value)
                          ) : column.id === "totalSpent" ? (
                            "₹" + column.format(value)
                          ) : column.id === "date" ? (
                            dataFormat
                          ) : (
                            value
                          )}
                        </Cell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {dataExist == false && (
          <center>
            <NoDataText>No Data</NoDataText>
          </center>
        )}
      </Container>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableContent;
// Styles
const Container = styled(TableContainer)`
  max-height: 635px;
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
