const express = require("express");
const postController = require("../controllers/postController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("", verifyToken, postController.createPosts);
router.get("", verifyToken, postController.getPosts);
router.patch("/:postId", postController.modifyPosts);
router.delete("/:postId", postController.deletePosts);
router.post("/like/:userId/post/:postId", postController.createLikes);

module.exports = {
  router,
};
