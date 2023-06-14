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

app.get("/posts", async (req, res) => {
  const posts = await appDataSource.query(
    `
            SELECT
                user_id,
                title,
                content,
                imageurl
            FROM posts
          `
  );
  res.json({ data: posts });
});

// 게시물 등록
app.post("/posts", async (req, res) => {
  console.log(req.body);
  const { userid, title, content, imageurl } = req.body;

  await appDataSource.query(
    `
            INSERT INTO posts(
                user_id,
                title,
                content,
                imageurl
            ) VALUES (
                ?,
                ?,
                ?,
                ?
            )
        `,
    [userid, title, content, imageurl]
  );
  res.status(201).json({ message: "postCreated" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
