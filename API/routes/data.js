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
  const tableRef = db.collection("table").doc(uid);
  let dataArray = [];
  let tableArray = [];

  isNewTransaction(uid).then((value) => {
    if (value == 200) {
      getSubcollection(uid).then((subCollection) => {
        subCollection.forEach(async (collection) => {
          const snapshot = await dataRef.collection(collection).get();
          dataArray.push(snapshot.docs.map((doc) => doc.data()));
        });

        setTimeout(() => {
          const setResult = setTableData(dataArray, uid);
          if (setResult) {
            subCollection.forEach(async (collection) => {
              const snapshot = await tableRef.collection(collection).get();
              snapshot.docs.map((doc) => tableArray.push(doc.data()));
            });
            setTimeout(() => {
              res.send({ data: tableArray, status: "success" });
            }, 500);
          } else {
            res.send({
              data: "Internal server error!",
              status: "failed",
            });
          }
        }, 350);
      });
    } else if (value == 404) {
      getSubcollection(uid).then((subCollection) => {
        subCollection.forEach(async (collection) => {
          const snapshot = await tableRef.collection(collection).get();
          snapshot.docs.map((doc) => tableArray.push(doc.data()));
        });
        setTimeout(() => {
          res.send({ data: tableArray, status: "success", code: 200 });
        }, 500);
      });
    } else if (value == 405) {
      res.send({ data: "No Data", status: "success", code: 404 });
    } else {
      res.send({ data: "Internal server error!", status: "failed", code: 500 });
    }
  });
});

module.exports = router;
