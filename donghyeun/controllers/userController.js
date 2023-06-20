const userService = require("../services/userService");

const signUp = async (req, res) => {
  const { name, email, password, phoneNumber, profileImage } = req.body;

  if (!name || !email || !password || !phoneNumber || !profileImage) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  await userService.signUp(name, email, password, phoneNumber, profileImage);
  return res.status(201).json({
    message: "SIGNUP_SUCCESS",
  });
};

module.exports = { signUp };
