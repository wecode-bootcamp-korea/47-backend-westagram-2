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

//Middlewares
app.use(cors());
app.use(logger("combined"));
app.use(express.json());

//여기부턴 API를 등록해두는것
app.get("/ping", function (req, res) {
  res.json({ message: "ping" });
});

//회원가입 API
app.post("/users", async function (req, res) {
  //request의 body로부터 받은 데이터를 변수에 저장하는 과정
  const { name, email, profileImage, password, phoneNumber } = req.body;
  await appDataSource.query(
    `
    INSERT INTO users( 
      name,
      email,
      profile_image,
      password,
      phone_number
    ) VALUES (?, ?, ?, ?, ?)`,
    [name, email, profileImage, password, phoneNumber]
  );
  res.status(201).json({ message: "SUCCESS_CREATE_USER" });
});

//게시물 등록 API
app.post("/posts", async (req, res) => {
  const { content, userId } = req.body;
  await appDataSource.query(
    `
        INSERT INTO posts(
         content,
         user_id
      ) VALUES (
        ?,
        ?
      )`,
    [content, userId]
  );
  res.status(201).json({ message: "SUCCESS_CREATE_POST" });
});

//전체 게시물 조회 API
app.get("/posts", async (req, res) => {
  const posts = await appDataSource.query(`
      SELECT     
       users.id,
       users.profile_image AS userProfileImage,
       posts.id AS postingId,
       posts.post_image_url AS postingImageUrl,
       posts.content AS postingContent      
      FROM 
       users, posts
      WHERE 
       users.id = posts.user_id`);
  res.status(200).json({ data: posts });
});

//유저 id로 정보 및 user의 게시물 상세 정보 API
app.get("/users/:userId/posts", async (req, res) => {
  const userId = req.params.userId;
  const usersPosts = await appDataSource.query(
    `
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
      users.id = ?;`,
    [userId]
  );
  res.status(200).json({ data: usersPosts });
});

//게시물 수정 API
app.patch("/posts/modify/:postId", async (req, res) => {
  const { title, content } = req.body;
  const { postId } = req.params;
  const userId = req.body.userId;
  await appDataSource.query(
    `
    UPDATE 
     posts
    SET 
     title = ?, 
     content = ?
    WHERE 
     id = ?;
  `,
    [title, content, postId]
  );
  const modifyPost = await appDataSource.query(
    `
    SELECT 
     users.id AS userId,
     users.name AS userName,
     posts.id AS postingId,
     posts.title AS postingTitle,
     posts.content AS postingContent
    FROM 
     users
    JOIN 
     posts ON users.id = posts.user_id
    WHERE 
     users.id = ? AND posts.id = ?;
  `,
    [userId, postId]
  );
  res.status(200).json({ message: "Successfully updated" });
});

//게시물 삭제 API
app.delete("/posts/delete/:postId", async (req, res) => {
  const { postId } = req.params;
  await appDataSource.query(
    `
    DELETE FROM posts
    WHERE id = ?;
  `,
    [postId]
  );
  res.status(204).json({ message: "Successfully deleted" });
});

//좋아요 API
app.post("/likes/:userId/:postId", async (req, res) => {
  const { userId, postId } = req.params;
  await appDataSource.query(
    `
    INSERT INTO likes(
    user_id,
    post_id
    )VALUES(
      ?,?)
  `,
    [userId, postId]
  );
  res.status(201).json({ message: "likesCreated" });
});

//Sever Start
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
