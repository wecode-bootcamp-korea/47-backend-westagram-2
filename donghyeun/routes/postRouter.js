const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("", postController.createPost);
router.get("/all", postController.getAllPost);
router.get("/user/:userId", postController.getPostById);
router.patch("/:postId", postController.modifyPostById);
router.delete("/:postId", postController.deletePostById);
router.post("/like/:postId", postController.likePostById);

module.exports = { router };
