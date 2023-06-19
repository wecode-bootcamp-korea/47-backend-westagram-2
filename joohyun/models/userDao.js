require("dotenv").config();
const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    appDataSource.destroy();
  });

const createUser = async (name, email, password, profileImage, phoneNumber) => {
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
};

const getUserPosts = async (userId) => {
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
};

module.exports = {
  createUser,
  getUserPosts,
};
