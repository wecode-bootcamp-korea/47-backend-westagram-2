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

app.post("/users", async (req, res) => {
  const { email, name, password, phoneNumber } = req.body;

  await appDataSource.query(
    `
        INSERT INTO users(
          email,
          name,
          password,
          phone_number
        ) VALUES (
          ?,
          ?,
          ?,
          ?
        )
      `,
    [email, name, password, phoneNumber]
  );
  res.status(201).json({ message: "userCreated" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
