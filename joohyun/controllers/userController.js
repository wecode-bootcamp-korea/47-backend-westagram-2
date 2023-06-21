const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage, phoneNumber } = req.body;

    if (!name || !email || !password || !profileImage || !phoneNumber) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, password, profileImage, phoneNumber);
    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const posts = await userService.getUserPosts(userId);
  return res.status(200).json({ data: posts });
};

const userLogin = async (req, res) => {
  const { email, password } = req.params;
  const login = await userService.userLogin(email, password);
  return res.status(login.status).json(login.data);
};

module.exports = {
  signUp,
  getUserPosts,
  userLogin,
};
