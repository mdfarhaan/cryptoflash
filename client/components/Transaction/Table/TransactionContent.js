import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth } from "../../../firebase";
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
import { APIEndpoints } from "../../config/Constants";
import Loading from "../../Utils/Loading";

function TableContent() {
  const [isLoading, setIsLoading] = useState(true);

  //Data
  const [user] = useAuthState(auth);
  const [tableData, setTableData] = useState([]);
  const [dataExist, setDataExist] = useState(true);

  //Fetch Table Data from API
  const fetchData = () => {
    fetch(APIEndpoints.TRANSACTION_DATA + user.uid).then((response) => {
      response.json().then((res) => {
        if (res.code == 404) {
          setDataExist(false);
          setIsLoading(false);
        } else {
          setTableData(res.data);
          setIsLoading(false);
        }
      });
    });
  };

  // Fetch Table Data
  useEffect(() => {
    fetchData();
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return !isLoading ? (
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
                            "???" + column.format(value)
                          ) : column.id === "totalSpent" ? (
                            "???" + column.format(value)
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
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  ) : (
    <Loading />
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
