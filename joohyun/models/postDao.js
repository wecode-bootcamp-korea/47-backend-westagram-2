
const appDataSource = require('./dataSource');

const createPosts = async (title, content, userId) => {
  await appDataSource.query(
    ` INSERT INTO posts(
        title,
        content,
        user_id
      ) VALUES (?,?,?);`,
    [title, content, userId]
  );
};

const getPosts = async () => {
  const getPostsResult = await appDataSource.query(
    ` SELECT 
    users.id,
    users.profile_image AS userProfileImage,
    posts.id AS postingId,
    posts.post_image_url AS postImage,
    posts.content AS postingContent   
  FROM
  users, posts
  WHERE
  users.id = posts.user_id`
  );
  return getPostsResult;
};

const modifyPosts = async (title, content, postId) => {
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
  const selectResult = await appDataSource.query(
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
     posts.id = ?;
  `,
    [postId]
  );
  console.log(selectResult);
  return selectResult;
};

const deletePosts = async (postId) => {
  const postsDelete = await appDataSource.query(
    `
    DELETE FROM posts
    WHERE id = ?;
  `,
    [postId]
  );
  return postsDelete;
};

const postsLikes = async (userId, postId) => {
  const personLikes = await appDataSource.query(
    `
    INSERT INTO likes(
    user_id,
    post_id
    )VALUES(?,?)
  `,
    [userId, postId]
  );
  return personLikes;
};

module.exports = {
  createPosts,
  getPosts,
  modifyPosts,
  deletePosts,
  postsLikes,
};
