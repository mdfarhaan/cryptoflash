const express = require("express");
const cors = require("cors");
const { PORT } = require("./src/shared/config");
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

app.use("/api/v1", require("./src/routes"));
app.use("/", (req, res) => {
  res.send("Cryptoflash API");
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server running on Port: " + PORT);
});
