global.SC_DISABLE_SPEEDY = true;
import React, { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Loading from "../components/Utils/Loading";
// Global Styles
const LightModeGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #ecf0f4;  
  }
`;
const DarkModeGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #20242A; 
  }
`;

//ThemeProvider
const DarkMode = {
  background: "#20242A",
  card: "#2B3038",
  text: "#ececec",
  transactionComponentText: "#2B3038",
};

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const [theme, setTheme] = useState(DarkMode);

  useEffect(() => {
    setTheme(
      typeof window !== "undefined" &&
        window.localStorage.getItem("theme") == null
        ? DarkMode
        : typeof window !== "undefined" &&
            JSON.parse(window.localStorage.getItem("theme"))
    );

    if (user) {
      db.collection("users").doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, []);

  return (
    <>
      {theme.theme == "light" ? (
        <LightModeGlobalStyle />
      ) : (
        <DarkModeGlobalStyle />
      )}
      <ThemeProvider theme={theme}>
        {<Component {...pageProps} />}
      </ThemeProvider>
    </>
  );
}
