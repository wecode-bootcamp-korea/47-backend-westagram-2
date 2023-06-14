require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use(cors());
app.use(logger("combined"));
app.use(express.json());

app.get("/ping", function (req, res, next) {
  res.json({ message: "ping" });
});
app.post("/posts", async function (req, res) {
  console.log(req.body);
  const { content, user_id } = req.body;
  await appDataSource.query(
    `
        INSERT INTO posts(

        content,
        user_id
      ) VALUES (
        ?,
        ?
      )
    `,
    [content, user_id]
  );
});
res.json({ message: "SUCCESS_CREATE_POST" });
app.listen(3000, function () {
  console.log("server listening on port 3000");
});
