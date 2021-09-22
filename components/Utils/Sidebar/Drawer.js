import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import TransactionIcon from "@material-ui/icons/AccountBalance";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssetsIcon from "@material-ui/icons/AccountBalanceWallet";

function Drawer(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  //Current Date and Time
  var objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      var a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  var today =
    curHour +
    ":" +
    curMinute +
    "." +
    curSeconds +
    curMeridiem +
    " " +
    dayOfWeek +
    " " +
    dayOfMonth +
    " of " +
    curMonth +
    ", " +
    curYear;
  var date = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
  var time = curHour + ":" + curMinute + curMeridiem;

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
            {itemList.map((item, index) => {
              const { text, icon, path } = item;

              return (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ListItem button key={text} onClick={() => router.push(path)}>
                    {icon && <IconItem>{icon}</IconItem>}
                    <Item primary={text} />
                  </ListItem>
                </motion.div>
              );
            })}
          </List>

          <BottomData>
            <center>
              <Text>{date}</Text>
              <Text>{time}</Text>
            </center>
          </BottomData>
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
  height: 905px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 80px;
`;
const BottomData = styled.div``;
const Text = styled.h4`
  color: ${(props) => props.theme.text};
`;
const Item = styled(ListItemText)`
  color: ${(props) => props.theme.text};
`;
const IconItem = styled(ListItemIcon)`
  color: ${(props) => props.theme.text};
`;
