import Head from "next/head";
import Assets from "../components/Assets/Assets";

export default function TransactionPage(props) {
  return (
    <div>
      <Head>
        <title>Assets</title>
        <meta name="Assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Assets />
    </div>
  );
}
