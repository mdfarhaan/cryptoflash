const db = require("../shared/firebase");
const axios = require("axios");
const coinData = require("./coinData");

//Doc exists
const isExist = async (uid) => {
  let result = true;
  try {
    const dataRef = db.collection("data").doc(uid);
    await dataRef.get().then((doc) => {
      if (doc.exists) {
        result = 200;
      } else {
        result = 404;
      }
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//Add Transaction
const addTransaction = async (data, uid) => {
  try {
    const userDocRef = db.collection("data").doc(uid);
    // Add Data to Subcollection Document
    await userDocRef.collection(data.coin).add({
      transaction: data.transaction,
      coin: data.coin,
      quantity: data.quantity,
      pricePerCoin: data.pricePerCoin,
      date: data.date,
      totalSpent: data.quantity * data.pricePerCoin,
    });
    //Add Coin Name to subcollection field
    await userDocRef.get().then((doc) => {
      //Subcollection field doesn't exist

      if (doc.data() == undefined) {
        userDocRef.set({
          newTransaction: true,
          subcollection: [data.coin],
        });
        //Subcollection field exists
      } else {
        const subcollection = doc.data().subcollection;
        let newArray = subcollection;
        subcollection.includes(data.coin)
          ? userDocRef.set({ newTransaction: true }, { merge: true })
          : newArray.push(data.coin) &&
            userDocRef.set({
              newTransaction: true,
              subcollection: newArray,
            });
      }
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//Get Subcollection
const getSubcollection = async (uid) => {
  let collection;
  try {
    const dataRef = db.collection("data").doc(uid);
    await dataRef.get().then((doc) => {
      if (doc.exists) {
        collection = doc.data().subcollection;
      }
    });
    return collection;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// check for new transaction
const isNewTransaction = async (uid) => {
  let transactionStatus;
  try {
    const dataRef = db.collection("data").doc(uid);
    await dataRef.get().then((doc) => {
      if (doc.exists) {
        const newTransaction = doc.data().newTransaction;
        if (newTransaction) {
          transactionStatus = 200;
        } else {
          transactionStatus = 404;
        }
      } else {
        transactionStatus = 405;
      }
    });
    return transactionStatus;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// set table data
const setTableData = async (data, uid) => {
  let returnRes;
  try {
    const transactionRef = await db.collection("data").doc(uid);
    const res = transactionRef.update({ newTransaction: false });
    data.forEach(async (coinObj) => {
      var Holdings = 0; //current Coin holdings
      var Value = 0; //totalSpent
      let currentCoinName;

      let currentCoin = {
        name: "",
        img: "",
        symbol: "",
        price: "", //current price
        day: 1.8, //API
        holdings: 0, // current holdings
        value: 0, //current value
        pandl: 0, //current profit
      };
      try {
        axios
          .get("https://api.wazirx.com/api/v2/tickers/")
          .then(async (response) => {
            const priceObj = response.data;
            coinObj.forEach((coinDoc) => {
              currentCoinName = coinDoc.coin;
              var coinDetails = coinData[coinDoc.coin];
              let price =
                priceObj[coinDetails.symbol.toLowerCase() + "inr"]["last"];

              if (coinDoc.transaction == "Buy") {
                Holdings = Holdings + coinDoc.quantity;
                Value = Value + coinDoc.totalSpent;
              } else {
                Holdings = Holdings - coinDoc.quantity;
                Value = Value - coinDoc.totalSpent;
              }

              if (Number(Holdings) === Holdings && Holdings % 1 === 0) {
                Holdings = parseInt(Holdings);
              } else {
                Holdings = parseFloat(Holdings.toFixed(6));
              }
              //TO BE DEBUGGED
              currentCoin.name = currentCoinName;
              currentCoin.img = coinDetails.img;
              currentCoin.symbol = coinDetails.symbol;
              currentCoin.price = price;
              currentCoin.holdings = Holdings;
              currentCoin.value = Holdings * price;
              currentCoin.pandl = Holdings * price - Value;
            });
            // Update TableCoinData
            db.collection("table")
              .doc(uid)
              .collection(currentCoinName)
              .doc("TableCoinData")
              .set({
                name: currentCoin.name,
                img: currentCoin.img,
                symbol: currentCoin.symbol,
                price: currentCoin.price, //current price
                day: currentCoin.day, //API
                holdings: currentCoin.holdings, // current holdings
                value: currentCoin.value, //current value
                pandl: currentCoin.pandl, //current profit
              });
          });

        returnRes = true;
      } catch (err) {
        console.log(err);
        return false;
      }
    });
    return returnRes;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  isExist,
  addTransaction,
  getSubcollection,
  isNewTransaction,
  setTableData,
};
