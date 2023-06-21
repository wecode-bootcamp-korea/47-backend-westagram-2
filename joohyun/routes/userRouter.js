const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signUp", userController.signUp);
router.get("/:userId/posts", userController.getUserPosts);

module.exports = {
  router,
};
