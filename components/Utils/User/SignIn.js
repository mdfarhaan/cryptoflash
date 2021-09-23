import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Typography, Button, TextField } from "@material-ui/core";
import { auth, provider } from "../../../firebase";
import * as EmailValidator from "email-validator";
import { GrGoogle } from "react-icons/gr/";
import { motion } from "framer-motion";

function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const signInwithGoogle = () => {
    auth.signInWithPopup(provider).catch(alert);
    router.push("/dashboard");
  };

  const signIn = (e) => {
    e.preventDefault();
    EmailValidator.validate(email)
      ? auth.signInWithEmailAndPassword(email, password).catch((e) => {
          alert(e.message);
        })
      : alert("Invalid Email!");
    router.push("/dashboard");
  };

  const forgotPassword = () => {
    try {
      auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      alert("Invalid Email!");
    }
  };
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Container>
        <Items>
          <center>
            <Title>Sign in</Title>
            <motion.div whileHover={{ scale: 1.1 }}>
              <WithGoogleBtn
                variant="contained"
                color="primary"
                onClick={signInwithGoogle}
              >
                <GoogleIcon size={20} />
                Sign in with Google
              </WithGoogleBtn>
            </motion.div>

            <Text>or</Text>

            <div style={{ paddingBottom: 10 }}>
              <TextField
                id="standard-basic"
                label="Email"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div style={({ paddingBottom: 10 }, { paddingTop: 10 })}>
              <TextField
                id="standard-basic"
                label="Password"
                style={{ width: "100%" }}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <ForgotPasswordLink onClick={forgotPassword}>
                Forgot password
              </ForgotPasswordLink>
            </div>
            <div style={{ paddingTop: 10 }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SignInBtn variant="contained" color="primary" onClick={signIn}>
                  Sign in
                </SignInBtn>
              </motion.div>
            </div>
            <BottomText>
              {"Don't have an account?"}
              <Bottomlink onClick={props.onSignUpHandler}>
                Get started
              </Bottomlink>
            </BottomText>
          </center>
        </Items>
      </Container>
    </motion.div>
  );
}

export default SignIn;

// Styles
const Container = styled.div`
  display: grid;
  background-color: white;
  place-items: center;
  height: 100vh;
  @media (max-width: 1224px) {
    padding-top: 25px;
  }
`;
const Title = styled(Typography)`
  font-size: 40px;
  font-weight: bold;
  padding: 20px;
  @media (max-width: 1224px) {
    font-size: 50px;
  }
`;
const Items = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  @media (max-width: 1224px) {
    width: 400px;
    padding: 30px;
  }
`;
const Text = styled(Typography)`
  padding: 15px;
  @media (max-width: 1224px) {
    font-size: 25px;
  }
`;
const BottomText = styled(Typography)`
  padding: 15px;
  @media (max-width: 1224px) {
    font-size: 25px;
  }
`;
const Bottomlink = styled.button`
  text-decoration: none;
  background: none;
  border: none;
  color: #0645ad;
  font-family: arial, sans-serif;
  cursor: pointer;
  font-size: 16px;
  @media (max-width: 1224px) {
    font-size: 26px;
  }
`;
const WithGoogleBtn = styled(Button)`
  width: 350px;
  @media (max-width: 1224px) {
    width: 100%;
    font-size: 20px;
  }
`;
const ForgotPasswordLink = styled.button`
  text-decoration: none;
  background: none;
  border: none;
  color: #0645ad;
  font-family: arial, sans-serif;
  cursor: pointer;
  font-size: 14px;
  padding-top: 10px;
  @media (max-width: 1224px) {
    font-size: 20px;
  }
`;
const GoogleIcon = styled(GrGoogle)`
  size: 50px;
  padding: 5px;
`;
const SignInBtn = styled(Button)`
  width: 100%;
  @media (max-width: 1224px) {
    font-size: 20px;
  }
`;
