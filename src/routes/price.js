const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  try {
    axios
      .get(`https://api.wazirx.com/api/v2/tickers/`)
      .then(async (response) => {
        const priceObj = response.data;
        res.json(priceObj);
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
