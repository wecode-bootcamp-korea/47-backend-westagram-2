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

const createPost = async (userId, title, content, imageUrl) => {
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
      );
    `,
    [userId, title, content, imageUrl]
  );
};

const viewAllPost = async () => {
  const AllPostResult = await appDataSource.query(`
  SELECT posts.user_id userID
  , users.profile_image userProfileImage
  , posts.id postingId
  , posts.imageurl postingImageUrl
  , posts.content postingContent
  FROM users
  JOIN posts
  WHERE users.id = posts.user_id;
`);
  return AllPostResult;
};

const viewUserPost = async () => {
  const UserPostResult = await appDataSource.query(`
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
  return UserPostResult;
};

const ModifyPost = async (content, userId, postId) => {
  await appDataSource.query(
    `
    UPDATE posts
    SET content = ?
    WHERE user_id = ? AND id = ${postId};
  `,
    [content, userId]
  );
};

const DeletePost = async (postId) => {
  await appDataSource.query(
    `
    DELETE FROM posts
    WHERE posts.id = ${postId}
  `
  );
};

const LikePost = async (postId, userId) => {
  await appDataSource.query(
    `
    INSERT INTO likes(
      user_id
      , post_id
    ) VALUES (
      ?,
      ${postId}
    );
  `,
    [userId]
  );
};

module.exports = {
  createPost,
  viewAllPost,
  viewUserPost,
  ModifyPost,
  DeletePost,
  LikePost,
};
