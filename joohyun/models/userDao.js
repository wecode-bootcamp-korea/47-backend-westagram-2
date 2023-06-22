const { appDataSource } = require("./dataSource");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (name, email, password, profileImage, phoneNumber) => {
  try {
    const newUser = await appDataSource.query(
      `INSERT INTO users(
      name,
      email,
      password,
      profile_image,
      phone_number
      ) VALUES (?, ?, ?, ?, ?);
     `,
      [name, email, password, profileImage, phoneNumber]
    );
    return newUser;
  } catch (error) {
    console.error("Error Creating User");
    throw error;
  }
};

const getUserPosts = async (userId) => {
  try {
    const userPosts = await appDataSource.query(
      `
    SELECT
      users.id AS userId,
      users.profile_image AS userProfileImage,
      JSON_ARRAYAGG(
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
      users.id = ?;
    `,
      [userId]
    );
    return userPosts;
  } catch (error) {
    console.error("Error Getting User Posts");
    throw error;
  }
};

const userLogin = async (email) => {
  try {
    const user = await appDataSource.query(
      `SELECT email, password FROM users
      WHERE email = ?`,
      [email]
    );
    return user;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserPosts,
  userLogin,
};
