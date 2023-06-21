const { appDataSource } = require("./dataSource");

const createPosts = async (title, content, userId) => {
  try {
    await appDataSource.query(
      `INSERT INTO posts(
        title,
        content,
        user_id
      ) VALUES (?,?,?);`,
      [title, content, userId]
    );
  } catch (error) {
    console.error("Error creating post");
    throw error;
  }
};

const getPosts = async () => {
  try {
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
  } catch (error) {
    console.error("Error retrieving posts");
    throw error;
  }
};

const modifyPosts = async (title, content, postId) => {
  try {
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
    return selectResult;
  } catch (error) {
    console.error("Error modifying posts");
    throw error;
  }
};

const deletePosts = async (postId) => {
  try {
    const postsDelete = await appDataSource.query(
      `
    DELETE FROM posts
    WHERE id = ?;
  `,
      [postId]
    );
    return postsDelete;
  } catch (error) {
    console.error("Error deleting posts");
    throw error;
  }
};

const createLikes = async (userId, postId) => {
  try {
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
  } catch (error) {
    console.error("Error Creating Likes");
    throw error;
  }
};

module.exports = {
  createPosts,
  getPosts,
  modifyPosts,
  deletePosts,
  createLikes,
};
