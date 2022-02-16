const express = require("express");
const router = express.Router();

router.use("/add", require("./addTransaction"));
router.use("/data", require("./data"));
router.use("/transactions", require("./transactions"));
router.use("/price", require("./price"));

module.exports = router;
