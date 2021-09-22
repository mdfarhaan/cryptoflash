import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AssetsCard from "./AssetsCard";
import Bar from "../Utils/Sidebar/Bar";
import Modal from "@material-ui/core/Modal";
import LoadingData from "../Utils/LoadingData";
function Assets() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  //Fetch Data
  const [user] = useAuthState(auth);

  const dataRef = db.collection("data").doc(user.uid);
  const tableRef = db.collection("table").doc(user.uid);
  const [tableData, setTableData] = useState([]);
  const [showLoadingData, setShowLoadingData] = useState(true);
  const [dataExist, setDataExist] = useState(true);

  const modalClose = () => {
    setShowLoadingData(false);
  };
  // Fetch Table Data
  useEffect(() => {
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
  }, []);
  const rows = [...Array(Math.ceil(tableData.length / 4))];

  const productRows = rows.map((row, idx) =>
    tableData.slice(idx * 4, idx * 4 + 4)
  );
  const Mobilerows = [...Array(Math.ceil(tableData.length / 2))];

  const MobileproductRows = Mobilerows.map((row, idx) =>
    tableData.slice(idx * 2, idx * 2 + 2)
  );

  return (
    <>
      <Bar />
      {setTimeout(() => {
        modalClose();
      }, 2000)}
      <Container>
        <LoadingDataContainer open={showLoadingData} onClose={modalClose}>
          <LoadingData />
        </LoadingDataContainer>
        <Title>Assets</Title>
        {isDesktopOrLaptop && (
          <div>
            {productRows.map((row, index) => {
              return (
                <CardContainer key={index}>
                  {row.map((card) => {
                    return (
                      <motion.div
                        key={card.name}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AssetsCard
                          key={card.name}
                          name={card.name}
                          img={card.img}
                          holdings={card.holdings}
                          value={card.value}
                          symbol={card.symbol}
                        />
                      </motion.div>
                    );
                  })}
                </CardContainer>
              );
            })}
          </div>
        )}
        {isTabletOrMobile && (
          <div>
            {MobileproductRows.map((row, index) => {
              return (
                <CardContainer key={index}>
                  {row.map((card) => {
                    return (
                      <AssetsCard
                        key={card.name}
                        name={card.name}
                        img={card.img}
                        holdings={card.holdings}
                        value={card.value}
                        symbol={card.symbol}
                      />
                    );
                  })}
                </CardContainer>
              );
            })}
          </div>
        )}
        {dataExist == false && (
          <center>
            <NoDataText>No Data</NoDataText>
          </center>
        )}
      </Container>
    </>
  );
}

export default Assets;

//Styles
const Container = styled.div`
  padding-left: 300px;
  padding-top: 60px;
  @media (max-width: 1224px) {
    padding-left: 40px;
    padding-top: 80px;
  }
`;
const CardContainer = styled.div`
  display: flex;
`;
const Title = styled(Typography)`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;
const LoadingDataContainer = styled(Modal)`
  backdrop-filter: blur(8px);
`;
const NoDataText = styled(Typography)`
  color: ${(props) => props.theme.text};
  font-size: 30px;
  padding: 30px;
`;
