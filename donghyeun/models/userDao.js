const { appDataSource } = require("./dataSource");

const createUser = async (name, email, password, phoneNumber, profileImage) => {
  await appDataSource.query(
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
    [name, email, password, phoneNumber, profileImage]
  );
};

module.exports = { createUser };
