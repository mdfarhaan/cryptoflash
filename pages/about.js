import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

function About() {
  return (
    <Container>
      <Head>
        <title>About</title>
        <meta name="Assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Title>About</Title>
        <Para>Cryptoflash is a blah blah</Para>
        <Para>
          Easy to understand table to see your crypto currency transactions.
        </Para>
      </div>
    </Container>
  );
}

export default About;

//Styles

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  padding: 50px;
  background-color: white;
  position: fixed;
`;
const Title = styled(Typography)`
  font-size: 50px;
  font-weight: bold;
  @media (max-width: 1224px) {
    font-size: 25px;
  }
`;
const Para = styled(Typography)`
  font-size: 25px;
  @media (max-width: 1224px) {
    font-size: 25px;
  }
`;
