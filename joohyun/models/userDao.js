const dataSource = require("./dataSource");

const createUser = async (name, email, password, profileImage, phoneNumber) => {
  const newUser = await dataSource.appDataSource.query(
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
};

const getUserPosts = async (userId) => {
  const userPosts = await adataSource.appDataSource.query(
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
};

module.exports = {
  createUser,
  getUserPosts,
};
