import { useMediaQuery } from "react-responsive";
import React, { useState } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Fade,
  FormControlLabel,
  ListItemText,
  Switch,
  ListItemIcon,
} from "@material-ui/core";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "@material-ui/icons/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";
import TransactionIcon from "@material-ui/icons/AccountBalance";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssetsIcon from "@material-ui/icons/AccountBalanceWallet";
import { CgMenuLeftAlt } from "react-icons/cg/";

function Header() {
  const [user] = useAuthState(auth);
  //MediaQuery
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const router = useRouter();
  //Theme Set
  const DarkMode = {
    theme: "dark",
    background: "#20242A",
    card: "#2B3038",
    text: "#ececec",
    transactionComponentText: "#2B3038",
  };
  const LightMode = {
    theme: "light",
    background: "#ecf0f4",
    card: "#ffffff",
    text: "#33373D",
    transactionComponentText: "#2B3038",
  };

  const getLightModeSwitch = localStorage.getItem("lightModeSwitch");
  var initialSwitchObj;
  getLightModeSwitch == "true"
    ? (initialSwitchObj = true)
    : (initialSwitchObj = false);

  const switchTheme = () => {
    let switchObject;
    getLightModeSwitch == "true"
      ? (switchObject = false)
      : (switchObject = true);
    setLightModeSwitch(switchObject);
    localStorage.setItem("lightModeSwitch", switchObject);
    lightModeSwitch == true
      ? localStorage.setItem("theme", JSON.stringify(DarkMode))
      : localStorage.setItem("theme", JSON.stringify(LightMode));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  // UserAvatar Menu
  const [lightModeSwitch, setLightModeSwitch] = useState(initialSwitchObj);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const profilePic =
    user?.photoURL == null
      ? "https://avatars.dicebear.com/api/bottts/" +
        user.email.split("@") +
        ".svg"
      : user.photoURL;
  const logOut = () => {
    router.push("/");
    auth.signOut();
  };
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  // Drawer Menu
  const [DrawerStatus, setDrawerStatus] = useState(false);
  const [DraweranchorEl, setDrawerAnchorEl] = React.useState(null);
  const DrawerOpen = Boolean(DraweranchorEl);
  const openDrawer = (event) => {
    setDrawerAnchorEl(event.currentTarget);
    setDrawerStatus(true);
  };
  const closeDrawer = () => {
    setDrawerAnchorEl(null);
    setDrawerStatus(false);
  };
  const itemList = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Transaction", icon: <TransactionIcon />, path: "/transaction" },
    { text: "Assets", icon: <AssetsIcon />, path: "/assets" },
  ];

  return (
    <>
      <Container>
        <Navbar position="sticky">
          <Bar>
            {isTabletOrMobile && (
              <Icon>
                <IconButton onClick={openDrawer}>
                  {DrawerStatus == false ? <HamMenu /> : <Close />}
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={DraweranchorEl}
                  keepMounted
                  open={DrawerOpen}
                  onClose={closeDrawer}
                  TransitionComponent={Fade}
                >
                  {itemList.map((item) => {
                    const { text, icon, path } = item;

                    return (
                      <MenuItem
                        button
                        key={text}
                        onClick={() => router.push(path)}
                      >
                        {icon && <IconItem>{icon}</IconItem>}
                        <Item primary={text} />
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Icon>
            )}

            <Title>CRYPTO FLASH</Title>
            <div>
              <UserAvatar
                alt={user.email}
                src={profilePic}
                onClick={openMenu}
              ></UserAvatar>
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={menuOpen}
                onClose={closeMenu}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={closeMenu}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={lightModeSwitch}
                        onChange={switchTheme}
                        name="lightMode"
                        color="primary"
                      />
                    }
                    label="Light Mode"
                  />
                </MenuItem>
                <MenuItem onClick={logOut}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Bar>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;

// Styles
const Container = styled.div``;
const Navbar = styled(AppBar)`
  background-color: ${(props) => props.theme.card};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: fixed;

  @media (max-width: 1224px) {
    position: fixed;
  }
`;
const Bar = styled(Toolbar)`
  justify-content: space-between;
`;
const Title = styled(Typography)`
  font-size: 35px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  @media (max-width: 1224px) {
    font-size: 25px;
  }
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const Icon = styled.div`
  display: grid;
  place-items: end;
`;
const HamMenu = styled(CgMenuLeftAlt)`
  color: ${(props) => props.theme.text};
`;
const Close = styled(CloseIcon)`
  color: ${(props) => props.theme.text};
`;
const Item = styled(ListItemText)`
  color: #2b3038;
`;
const IconItem = styled(ListItemIcon)`
  color: #2b3038;
`;
