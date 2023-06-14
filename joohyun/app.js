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

app.post("/posts", async function (req, res) {
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
  res.status(201).json({ message: "SUCCESS_CREATE_POST" });
});

app.get("/guest", async function (req, res) {
  const guest = await appDataSource.query(`
      SELECT
      
      users.id,
      users.profile_image AS userProfileImage,
      posts.id AS postingId,
      posts.post_image_url AS postingImageUrl,
      posts.content AS postingContent
      
      FROM users, posts
      WHERE users.id = posts.id
    `);
  res.status(200).json({ data: guest });
});

app.get("/userposts", async function (req, res) {
  const userposts = await appDataSource.query(`
      SELECT
      users.id AS userId,
      users.profile_image AS userProfileImage,
      JSON_ARRAY(
        JSON_OBJECT(
          'postingId', posts.id,
          'postingImageUrl', posts.post_image_url,
          'postingContent', posts.content
        )
      ) AS postings
    FROM
      users
    JOIN
      posts ON users.id = posts.user_id
    WHERE
      users.id = 1;
        `);

  res.status(200).json({ data: userposts });
});
app.listen(3000, function () {
  console.log("server listening on port 3000");
});
