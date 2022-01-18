const express = require("express");
const { isExist, getTable } = require("../services/services");
const router = express.Router();

// get data
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;

  isExist(uid).then((value) => {
    if (value == 200) {
      getTable(uid).then((value) => {
        res.send({
          data: value.data,
          coins: value.coins,
          status: "success",
          code: 200,
        });
      });
    } else if (value == 404) {
      res.send({ data: "No Data", status: "success", code: 404 });
    } else {
      res.send({ data: "Internal server error!", status: "failed", code: 500 });
    }
  });
});

module.exports = router;
