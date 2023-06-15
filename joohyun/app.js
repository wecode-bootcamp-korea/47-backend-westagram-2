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

app.get("/ping", function (req, res) {
  res.json({ message: "ping" });
});

app.post("/users", async function (req, res) {
  const { name, email, profileImage, password, phoneNumber } = req.body;

  await appDataSource.query(
    `
    INSERT INTO users(
    
      name,
      email,
      profile_image,
      password,
      phone_number
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `,
    [name, email, profileImage, password, phoneNumber]
  );
  res.status(201).json({ message: "SUCCESS_CREATE_USER" });
});

app.put("/modifyPost/:id", async (req, res) => {
  const postID = req.params.id;
  const { title, content } = req.body;
  await appDataSource.query(
    `
   UPDATE posts
   SET 
  title = ?,
  content = ?
  WHERE id = ?;`,
    [title, content, postID]
  );
  res.status(200).json({ message: "SUCCESS_MODIFY_POST" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
