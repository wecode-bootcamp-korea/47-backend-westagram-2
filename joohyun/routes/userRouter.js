const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/signUp", userController.signUp);
router.get("/:userId/posts", userController.getUserPosts);
router.post("/login", userController.userLogin);

module.exports = {
  router,
};
