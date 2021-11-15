import React, { useEffect } from "react";
import Head from "next/head";
import Assets from "../components/Assets/Assets";
import Home from "../components/Home/Home";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TransactionPage() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Assets | Cryptoflash</title>
        <meta name="Assets" />
        <link rel="icon" href="/fav.svg" />
      </Head>
      {!user ? <Home /> : <Assets />}
    </div>
  );
}
