import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import TransactionIcon from "@material-ui/icons/AccountBalance";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssetsIcon from "@material-ui/icons/AccountBalanceWallet";

function Drawer(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
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
                <ListItem button key={text} onClick={() => router.push(path)}>
                  {icon && <IconItem>{icon}</IconItem>}
                  <Item primary={text} />
                </ListItem>
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
  width: 230px;
  background-color: ${(props) => props.theme.card};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 80px;
`;

const Item = styled(ListItemText)`
  color: ${(props) => props.theme.text};
`;
const IconItem = styled(ListItemIcon)`
  color: ${(props) => props.theme.text};
`;
