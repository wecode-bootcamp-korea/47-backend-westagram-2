const { appDataSource } = require("./dataSource");

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

const getAllPost = async () => {
  const getAllPostResult = await appDataSource.query(`
  SELECT posts.user_id userID,
  users.profile_image userProfileImage,
  posts.id postingId,
  posts.imageurl postingImageUrl,
  posts.content postingContent
  FROM users
  JOIN posts
  WHERE users.id = posts.user_id;
`);
  return getAllPostResult;
};

const getPostById = async (userId) => {
  const getUserPostResult = await appDataSource.query(`
  SELECT users.id userId,
  users.profile_image userProfileImage,
  JSON_ARRAY (
    JSON_OBJECT (
      'postingId', posts.id,
      'postingImageUrl', posts.imageurl,
      'postingContent', posts.content
    )
  ) postings
  FROM users
  JOIN posts ON users.id = posts.user_id
  WHERE users.id = ${userId};
`);
  return getUserPostResult;
};

const modifyPostById = async (content, userId, postId) => {
  await appDataSource.query(
    `
    UPDATE posts
    SET content = ?
    WHERE user_id = ? AND id = ${postId};
  `,
    [content, userId]
  );

  const modifyPostResult = await appDataSource.query(
    `
    SELECT users.id userId,
    users.name userName,
    posts.id postingId,
    posts.title postingTitle,
    posts.content postingContent
    FROM users
    JOIN posts ON users.id = posts.user_id
    WHERE users.id = ?
    AND posts.id = ?
  `,
    [userId, postId]
  );
  return modifyPostResult;
};

const deletePostById = async (postId) => {
  await appDataSource.query(
    `
  DELETE FROM likes
  WHERE post_id = ${postId}
  `
  );

  await appDataSource.query(
    `
    DELETE FROM posts
    WHERE posts.id = ${postId}
  `
  );
};

const likePostById = async (postId, userId) => {
  await appDataSource.query(
    `
    INSERT INTO likes(
      user_id,
      post_id
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
  getAllPost,
  getPostById,
  modifyPostById,
  deletePostById,
  likePostById,
};
