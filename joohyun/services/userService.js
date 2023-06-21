const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const signUp = async (name, email, password, profileImage, phoneNumber) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const saltRounds = 12;
  const hashedPassword = await makeHash(password, saltRounds);
  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImage,
    phoneNumber
  );
  return createUser;
};

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const getUserPosts = async (userId) => {
  return await userDao.getUserPosts(userId);
};

module.exports = {
  signUp,
  getUserPosts,
};
