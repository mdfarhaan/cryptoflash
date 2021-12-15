const express = require("express");
const db = require("../shared/firebase");
const { isExist, getSubcollection } = require("../services/services");
const router = express.Router();

// get data
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  const dataRef = db.collection("data").doc(uid);
  let dataArray = [];

  isExist(uid).then((value) => {
    if (value == 200) {
      getSubcollection(uid).then((subCollection) => {
        subCollection.forEach(async (collection) => {
          const snapshot = await dataRef.collection(collection).get();
          snapshot.docs.map((doc) => dataArray.push(doc.data()));
        });
        setTimeout(() => {
          res.send({ data: dataArray, status: "success", code: 200 });
        }, 500);
      });
    } else if (value == 404) {
      res.send({ data: "No Data", status: "success", code: 404 });
    } else {
      res.send({ data: "Internal server error!", status: "failed" });
    }
  });
});

module.exports = router;
