import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { ListItem, List, ListItemIcon, Tooltip } from "@material-ui/core";
import TransactionIcon from "@material-ui/icons/AccountBalance";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssetsIcon from "@material-ui/icons/AccountBalanceWallet";

function Drawer(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1500px)",
  });

  const router = useRouter();
  const itemList = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Transaction", icon: <TransactionIcon />, path: "/transaction" },
    { text: "Assets", icon: <AssetsIcon />, path: "/assets" },
  ];
  return (
    <>
      {isDesktopOrLaptop && (
        <Container>
          <List>
            {itemList.map((item) => {
              const { text, icon, path } = item;
              return (
                <Tip title={text} placement={"right"}>
                  <ListItem button key={text} onClick={() => router.push(path)}>
                    {icon && <IconItem>{icon}</IconItem>}
                  </ListItem>
                </Tip>
              );
            })}
          </List>
        </Container>
      )}
    </>
  );
}

export default Drawer;
const Container = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.card};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IconItem = styled(ListItemIcon)`
  color: ${(props) => props.theme.text};
`;

const Tip = styled(Tooltip)`
  margin-left: 10px;
  &:hover {
    transform: scale(1.3);
  }
`;
