const express = require("express");
const cors = require("cors");
const { PORT } = require("./shared/config");
const app = express();

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());

app.use("/api/v1/add", require("./routes/addTransaction"));
app.use("/api/v1/data", require("./routes/data"));
app.use("/api/v1/set", require("./routes/setTableData"));
app.use("/api/v1/transactions", require("./routes/transactions"));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server running on Port: " + PORT);
});
