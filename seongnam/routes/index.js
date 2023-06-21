//routes/index.js

const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const likeRouter = require("./likeUpRouter");
router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/like",likeRouter.router);
module.exports = router;