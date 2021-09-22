import React from "react";
import styled from "styled-components";
import { Avatar, Typography } from "@material-ui/core";

function Assets(props) {
  return (
    <div>
      <Container>
        <Image alt={props.name} src={props.img} />
      </Container>
      <Card>
        <Data>
          <Title>{props.name}</Title>
          <Content>
            <Text>{props.holdings + props.symbol}</Text>
            <Text>|</Text>
            <Text>{"₹" + props.value.toFixed(2)}</Text>
          </Content>
        </Data>
      </Card>
    </div>
  );
}

export default Assets;

const Container = styled.div`
  display: flex;
  width: 20vw;
  margin: 1em auto -45px;
  border-radius: 50%;
  @media (max-width: 1224px) {
    width: 100px;
    padding-left: 60px;
  }
`;

const Image = styled(Avatar)`
  margin: 0 auto;
  flex-shrink: 0;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  @media (max-width: 1224px) {
    height: 70px;
    width: 70px;
    margin-left: -14px;
  }
`;

const Card = styled.div`
  margin: 1em auto 1em;
  padding: 40px 1em 1em;
  height: 10vh;
  width: 15vw;
  border-radius: 1em;
  overflow: hidden;
  position: relative;
  :before {
    content: "";
    width: 110px;
    border-radius: 50%;
    height: 80px;
    display: block;
    margin: -80px auto 0;
    box-shadow: 0 0 0 3000px white;
  }
  @media (max-width: 1224px) {
    width: 120px;
    height: 50px;
    :before {
      width: 85px;
    }
  }
`;
const Data = styled.div`
  display: grid;
  place-items: center;
`;
const Title = styled(Typography)`
  font-size: 35px;
  color: black;
  font-weight: bold;
  @media (max-width: 1224px) {
    font-size: 20px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: baseline;
`;
const Text = styled(Typography)`
  font-size: 25px;
  color: black;
  margin-right: 10px;
  @media (max-width: 1224px) {
    font-weight: bold;
    font-size: 10px;
  }
`;
