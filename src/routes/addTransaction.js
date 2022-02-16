const express = require("express");
const { addTransaction } = require("../services/services");
const router = express.Router();

// add new transaction
router.post("/", async (req, res) => {
  const { transaction, coin, quantity, pricePerCoin, date, totalSpent, uid } =
    req.body;
  const data = {
    transaction: transaction,
    coin: coin,
    quantity: quantity,
    pricePerCoin: pricePerCoin,
    date: date,
    totalSpent: totalSpent,
  };
  addTransaction(data, uid).then((value) => {
    value
      ? res.send({ data: "Added Successfully", status: 200 })
      : res.send({ data: "Failed", status: 500 });
  });
});

module.exports = router;
