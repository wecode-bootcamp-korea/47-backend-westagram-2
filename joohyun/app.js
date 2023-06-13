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

app.get("/users", async function (req, res, next) {
  const users = await appDataSource.query(`
    SELECT
      id,
      name,
      email,
      profile_image,
      password,
      phone_number,
      created_at,
      updated_at
    FROM users
  `);
  res.json({ data: users });
});

app.post("/users", async function (req, res, next) {
  console.log(req.body);
  const { name, email, password, phone_number } = req.body;

  await appDataSource.query(
    `
    INSERT INTO users(
    
      name,
      email,
      password,
      phone_number
    ) VALUES (
      ?,
      ?,
      ?,
      ?
    )
  `,
    [name, email, password, phone_number]
  );
  res.json({ message: "SUCCESS_CREATE_USER" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
