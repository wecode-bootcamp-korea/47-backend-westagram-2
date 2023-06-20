const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("", postController.createPosts);
router.get("", postController.getPosts);
router.patch("/:postId", postController.modifyPosts);
router.delete("/:postId", postController.deletePosts);
router.post("/like/:userId/post/:postId", postController.createLikes);

module.exports = {
  router,
};
