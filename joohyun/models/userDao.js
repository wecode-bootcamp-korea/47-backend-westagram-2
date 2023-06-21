const { appDataSource } = require("./dataSource");

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

const userLogin = async (email, password) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { status: 401, data: { error: "Invalid email or password" } };
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return { status: 401, data: { error: "Invalid email or password" } };
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1d" });

    return { status: 200, data: { token, message: "Login successful" } };
  } catch (error) {
    return { status: 500, data: { error: "Internal Server Error" } };
  }
};

const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]); // 첫 번째 사용자 결과 반환
      }
    });
  });
};

// const userLogin = async (email, password) => {

module.exports = {
  createUser,
  getUserPosts,
  userLogin,
};
