const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage, phoneNumber) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage,
    phoneNumber
  );

  return createUser;
};

const getUserPosts = async (userId) => {
  return await userDao.getUserPosts(userId);
};

module.exports = {
  signUp,
  getUserPosts,
};
