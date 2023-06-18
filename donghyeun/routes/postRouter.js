const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/upload", postController.Upload);
router.get("/all", postController.All);
router.get("/user", postController.User);
router.patch("/modify/:postId", postController.Modify);
router.delete("/delete/:postId", postController.Delete);
router.post("/like/:postId", postController.Like);

module.exports = { router };
