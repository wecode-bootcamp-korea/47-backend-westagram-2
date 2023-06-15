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
            )`,
    [userid, title, content, imageurl]
  );
  res.status(201).json({ message: "postCreated" });
});

// 전체 게시물 조회
app.get("/viewAllPosts", async (req, res) => {
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

// 유저 게시물 조회
app.get("/viewUserPosts", async (req, res) => {
  const viewUserPosts = await appDataSource.query(`
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
              JOIN posts ON users.id = posts.user_id;
          `);
  const users = res.json({ data: viewUserPosts });
});

// 게시물 수정
app.patch("/modifyPost/:postId", async (req, res) => {
  const { content, userId } = req.body;
  const { postId } = req.params;

  await appDataSource.query(
    `
    UPDATE posts
    SET content = ?
    WHERE user_id = ? AND id = ? ;
  `,
    [content, userId, postId]
  );

  const modifyPost = await appDataSource.query(`
    SELECT users.id userId
    , users.name userName
    , posts.id postingId
    , posts.title postingTitle
    , posts.content postingContent
    FROM users
    JOIN posts ON users.id = posts.user_id
    WHERE users.id = ${userId}
    AND posts.id = ${postId};
  `);

  res.status(201).json({ data: modifyPost });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
