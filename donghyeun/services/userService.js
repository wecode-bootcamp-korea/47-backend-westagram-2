const userDao = require("../models/userDao");

const signUp = async (name, email, password, phoneNumber, profileImage) => {
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    phoneNumber,
    profileImage
  );

  return createUser;
};

module.exports = { signUp };
