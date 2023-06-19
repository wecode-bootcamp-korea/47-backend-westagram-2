const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/createPosts", postController.createPosts);
router.get("/getPosts", postController.getPosts);
router.patch("/modify/:postId", postController.modifyPosts);
router.delete("/delete/:postId", postController.deletePosts);
router.post("/likes/:userId/:postId", postController.postsLikes);

module.exports = {
  router,
};
