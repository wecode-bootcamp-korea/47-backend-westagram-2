const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
require("dotenv").config();

const routes = require("./routes");
const { appDataSource } = require("./models/dataSource");
const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen("3000", () => {
  appDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      myDataSource.destroy();
    });
  console.log(`Server is listening on 3000`);
});
