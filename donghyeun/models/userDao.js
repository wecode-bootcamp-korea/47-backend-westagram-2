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
