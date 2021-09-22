import Head from "next/head";
import Transaction from "../components/Transaction/Transaction";

export default function TransactionPage() {
  return (
    <div>
      <Head>
        <title>Transaction</title>
        <meta name="Transaction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Transaction />
    </div>
  );
}
