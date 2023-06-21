const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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
  const payload = { userId: createUser.id }; 
  const secretKey = "pcwnpcwn123123"; 
  const expiresIn = "1d"; 
  const token = jwt.sign(payload, secretKey, { expiresIn });
   return { user: createUser, token };
};

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const getUserPosts = async (userId) => {
  return await userDao.getUserPosts(userId);
};

const userLogin = async (email, password) =>{
  return await userDao.userLogin(email, password);
};

module.exports = {
  signUp,
  getUserPosts,
  userLogin
};
