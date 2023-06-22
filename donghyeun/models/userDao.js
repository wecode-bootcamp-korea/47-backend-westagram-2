const { appDataSource } = require("./dataSource");

const createUser = async (name, email, hashedPassword, phoneNumber, profileImage) => {
    return await appDataSource.query(
        `
    INSERT INTO users(
        name,
        email,
        password,
        phone_number,
        profile_image
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?
      );
    `,
        [name, email, hashedPassword, phoneNumber, profileImage]
    );
};

const userPassword = async (email) => {
    return await appDataSource.query(
        `
  SELECT password
  FROM users
  WHERE email = ?
  `,
        [email]
    );
};

module.exports = { createUser, userPassword };
