const { createConnection } = require("typeorm");
const userDao = require("../models/userDao");

const bcrypt = require("bcrypt");

const signUp = async (name, email, password, phoneNumber, profileImage) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  const saltRounds = 12;
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const hashedPassword = await makeHash(password, saltRounds);

  return await userDao.createUser(
    name,
    email,
    hashedPassword,
    phoneNumber,
    profileImage
  );
};

module.exports = { signUp };
