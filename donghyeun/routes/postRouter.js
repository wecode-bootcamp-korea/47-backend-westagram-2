const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("", postController.createPost);
router.get("/all", postController.getAllPost);
router.get("/user/:userId", postController.getUserPost);
router.patch("/:postId", postController.modifyPost);
router.delete("/:postId", postController.deletePost);
router.post("/like/:postId", postController.likePost);

module.exports = { router };
