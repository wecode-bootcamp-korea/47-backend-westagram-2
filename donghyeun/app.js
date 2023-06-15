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

app.post("/posts", async (req, res) => {
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
            )`,
    [userid, title, content, imageurl]
  );
  res.status(201).json({ message: "postCreated" });
});

app.get("/posts/all", async (req, res) => {
  const viewAllPosts = await appDataSource.query(`
              SELECT posts.user_id userID
              , users.profile_image userProfileImage
              , posts.id postingId
              , posts.imageurl postingImageUrl
              , posts.content postingContent
              FROM users, posts
              WHERE users.id = posts.user_id;
          `);
  res.json({ data: viewAllPosts });
});

app.get("/posts/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const viewUserPosts = await appDataSource.query(
    `
              SELECT users.id userId 
              , users.profile_image userProfileImage
              , JSON_ARRAY (
                JSON_OBJECT (
                    'postingId', posts.id
                    , 'postingImageUrl', posts.imageurl
                    , 'postingContent', posts.content
                )
              ) postings
              FROM users
              JOIN posts ON users.id = posts.user_id
              WHERE users.id = ${userId};
          `,
    [userId]
  );
  const users = res.json({ data: viewUserPosts });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
