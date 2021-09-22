import React, { useEffect } from "react";
import Head from "next/head";
import Dashboard from "../components/Dashboard/Main/Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Home from "../components/Home/Home";

export default function DashboardPage() {
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
        <title>Dashboard</title>
        <meta name="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? <Home /> : <Dashboard />}
    </div>
  );
}
