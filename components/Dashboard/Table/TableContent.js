import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
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
import LoadingData from "../../Utils/LoadingData";

function TableContent(props) {
  const [user] = useAuthState(auth);
  const dataRef = db.collection("data").doc(user.uid);
  const tableRef = db.collection("table").doc(user.uid);
  const [tableData, setTableData] = useState([]);

  const fetchData = () => {
    var dataArray = [];
    dataRef.get().then((doc) => {
      if (doc.exists) {
        doc.data().subcollection.forEach((collection) => {
          tableRef.collection(collection).onSnapshot((snapshot) => {
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
  };

  // Fetch Table Data
  useEffect(() => {
    fetchData();
  }, []);

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
    // {
    //   id: "day",
    //   label: "24h",
    //   minWidth: 100,
    //   align: "center",
    //   format: (value) => value.toLocaleString("en-US"),
    // },
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
      format: (value) => value.toFixed(2),
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
            {tableData.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const name = row.name;
                    const img = row.img;

                    return (
                      <Cell key={column.id} align={column.align}>
                        {column.id === "img" ? (
                          <Avatar alt={name} src={img} />
                        ) : column.id === "price" ? (
                          "₹" + value
                        ) : column.id === "value" ? (
                          "₹" + column.format(value)
                        ) : column.id === "pandl" ? (
                          "₹" + column.format(value)
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
