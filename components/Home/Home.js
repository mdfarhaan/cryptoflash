import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import HomeHeader from "./HomeHeader";
import LandingPage from "./Sections/LandingPage";
import SignUp from "../Utils/User/SignUp";
import SignIn from "../Utils/User/SignIn";
import Dashboard from "./Sections/DashboardSection";
import Transaction from "./Sections/TransactionSection";
import Assets from "./Sections/AssetsSection";
import Footer from "./Sections/Footer";

function Home() {
  const [showSignUp, setShowSignUp] = useState(true);

  const SignInSet = () => {
    setShowSignUp(false);
  };
  const SignUpSet = () => {
    setShowSignUp(true);
  };
  return (
    <>
      <Head>
        <title>Cryptoflash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHeader />
      <Container>
        <div>
          <ItemLeft>
            <LandingPage />
          </ItemLeft>
          <ItemRight>
            {showSignUp ? (
              <SignUp onLoginHandler={SignInSet} />
            ) : (
              <SignIn onSignUpHandler={SignUpSet} />
            )}
          </ItemRight>
        </div>
        <Body>
          <center>
            <SubTitle>Features</SubTitle>
          </center>
          <Dashboard />
          <Transaction />
          <Assets />
        </Body>
        <Footer />
      </Container>
    </>
  );
}

export default Home;

// Styles
const Container = styled.div`
  width: 100%;
  background: white;
  @media (max-width: 1224px) {
    width: 120vh;
  }
`;
const SubTitle = styled(Typography)`
  font-size: 50px;
  @media (max-width: 1224px) {
    font-size: 55px;
    padding-top: 50px;
  }
`;
const ItemLeft = styled.div`
  float: left;
  width: 70%;
  @media (max-width: 1224px) {
    float: none;
    width: 100%;
  }
`;
const ItemRight = styled.div`
  float: right;
  justify-content: center;
  padding-right: 56px;
  @media (max-width: 1224px) {
    width: 100%;
    float: none;
    padding: 0px;
  }
`;
const Body = styled.div`
  clear: both;
`;
