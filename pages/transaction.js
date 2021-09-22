import React, { useEffect } from "react";
import Head from "next/head";
import Transaction from "../components/Transaction/Transaction";
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
        <title>Transaction</title>
        <meta name="Transaction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? <Home /> : <Transaction />}
    </div>
  );
}
