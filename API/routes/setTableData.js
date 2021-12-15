const express = require("express");
const db = require("../shared/firebase");
const {
  isNewTransaction,
  getSubcollection,
  setTableData,
} = require("../services/services");
const router = express.Router();

// get data
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  const dataRef = db.collection("data").doc(uid);

  let dataArray = [];

  getSubcollection(uid).then((subCollection) => {
    subCollection.forEach(async (collection) => {
      const snapshot = await dataRef.collection(collection).get();
      dataArray.push(snapshot.docs.map((doc) => doc.data()));
    });

    setTimeout(() => {
      const setResult = setTableData(dataArray, uid);
      if (setResult) {
        res.send({ data: "Table Set Successfully", status: 200 });
      } else {
        res.send({ data: "Table Set failed!", status: 500 });
      }
    }, 350);
  });
});

module.exports = router;
