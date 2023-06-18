const http = require("http");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
