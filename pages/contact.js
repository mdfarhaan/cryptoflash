import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { Typography, IconButton } from "@material-ui/core";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/Io/";

function About() {
  return (
    <Container>
      <Head>
        <title>Contact</title>
        <meta name="Assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <center>
          <Title>Get in touch</Title>
          <Para>
            Email :{" "}
            <MailLink
              href="https://mail.google.com/mail/u/0/?fs=1&to=farhaanm110@gmail.com&tf=cm"
              alt="Email"
            >
              farhaanm110@gmail.com
            </MailLink>
          </Para>
          <IconLink>
            <IconButton
              onClick={() => window.open("https://github.com/mdfarhaan")}
            >
              <GithubIcon size={50} />
            </IconButton>
            <IconButton>
              <LinkedInIcon size={50} />
            </IconButton>
          </IconLink>

          <LinkDiv>
            <Feedbacklink
              href="https://mail.google.com/mail/u/0/?fs=1&to=farhaanm110@gmail.com&tf=cm&su=Feedback"
              alt="Email"
            >
              Feedback
            </Feedbacklink>
          </LinkDiv>
        </center>
      </Content>
    </Container>
  );
}

export default About;

//Styles

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: white;
`;
const Content = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
const GithubIcon = styled(IoLogoGithub)`
  color: black;
`;
const LinkedInIcon = styled(IoLogoLinkedin)`
  color: black;
`;
const MailLink = styled.a`
  text-decoration: none;
  background: none;
  border: none;
  color: #0645ad;
  font-family: arial, sans-serif;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
`;
const Feedbacklink = styled.a`
  text-decoration: none;
  background: none;
  border: none;
  color: #0645ad;
  font-family: arial, sans-serif;
  cursor: pointer;
  font-size: 15px;
  padding: 5px;
`;
const LinkDiv = styled.div``;
const IconLink = styled.div``;
