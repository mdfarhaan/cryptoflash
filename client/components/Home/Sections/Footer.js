import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";

function LandingPage() {
  const router = useRouter();
  return (
    <Container>
      <center>
        <Title>CryptoFlash</Title>
        <Para>your crypto portfolio</Para>
        <Bottomlink
          onClick={() => {
            router.push("/contact");
          }}
        >
          Get in touch
        </Bottomlink>
      </center>
    </Container>
  );
}

export default LandingPage;

//Styles

const Container = styled.div`
  height: 300px;
  background-color: #2b3038;
  display: flex;
  justify-content: center;
  place-items: center;
`;
const Title = styled(Typography)`
  font-size: 75px;
  font-weight: bold;
  color: #ececec;
  @media (max-width: 1224px) {
    font-size: 75px;
  }
`;
const Para = styled(Typography)`
  font-size: 25px;
  padding-bottom: 10px;
  color: #ececec;
  @media (max-width: 1224px) {
    font-size: 35px;
  }
`;
const Bottomlink = styled.button`
  text-decoration: none;
  background: none;
  border: none;
  color: grey;
  font-family: arial, sans-serif;
  cursor: pointer;
  font-size: 30px;
`;
