const db = require("../shared/firebase");
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
    const symbol = coinData[data.coin].symbol;
    await userDocRef
      .collection(data.coin)
      .add({
        transaction: data.transaction,
        symbol: symbol,
        coin: data.coin,
        quantity: data.quantity,
        pricePerCoin: data.pricePerCoin,
        date: data.date,
        totalSpent: data.quantity * data.pricePerCoin,
      })
      .then(() => {
        //Add Coin Name to subcollection field
        userDocRef.get().then((doc) => {
          //New user subcollection and table filed doesn't exist
          if (doc.data() == undefined) {
            userDocRef.set({
              subcollection: [data.coin],
              table: {
                [data.coin]: {
                  coin: data.coin,
                  symbol: symbol,
                  invested: data.quantity * data.pricePerCoin,
                  holding: data.quantity,
                },
              },
            });
            //Subcollection field exists
          } else {
            const subcollection = doc.data().subcollection;
            // Set Table
            let newObj = {};
            const table = doc.data().table;
            if (table[data.coin]) {
              if (data.transaction == "Buy") {
                table[data.coin].holding += data.quantity;
                table[data.coin].invested += data.quantity * data.pricePerCoin;
              } else {
                table[data.coin].holding -= data.quantity;
                table[data.coin].invested -= data.quantity * data.pricePerCoin;
              }
              newObj = table;
            } else {
              newObj = {
                ...table,
                [data.coin]: {
                  coin: data.coin,
                  symbol: symbol,
                  holding: data.quantity,
                  invested: data.quantity * data.pricePerCoin,
                },
              };
            }

            let newArray = subcollection;
            subcollection.includes(data.coin)
              ? userDocRef.set({ table: newObj }, { merge: true })
              : newArray.push(data.coin) &&
                userDocRef.set({
                  subcollection: newArray,
                  table: newObj,
                });
          }
        });
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

const getTable = async (uid) => {
  let table;
  try {
    const dataRef = db.collection("data").doc(uid);
    await dataRef.get().then((doc) => {
      if (doc.exists) {
        table = doc.data().table;
        coins = doc.data().subcollection;
      }
    });

    return { data: table, coins: coins };
  } catch (err) {
    console.log(err);
    return false;
  }
};

// set table data
const setTableData = async (data, uid) => {
  console.log("Running Set Table");
  let returnRes;
  try {
    const transactionRef = await db.collection("data").doc(uid);
    data.forEach(async (coinObj) => {
      var Holdings = 0; //current Coin holdings
      var Value = 0; //totalSpent
      let currentCoinName;

      let currentCoin = {
        name: "",
        img: "",
        symbol: "",
        holdings: 0, // current holdings
        value: 0, //current value
      };

      coinObj.forEach((coinDoc) => {
        let coinDetails = coinData[coinDoc.coin];
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
        currentCoin.price = 0;
        currentCoin.holdings = Holdings;
        currentCoin.value = Holdings * 0;
        currentCoin.pandl = Holdings * 0 - Value;
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
          holdings: currentCoin.holdings, // current holdings
          value: currentCoin.value, //current value
          pandl: 0,
          price: 0,
        })
        .then(() => {
          const res = transactionRef.update({ newTransaction: false });
        });
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
  getTable,
};
