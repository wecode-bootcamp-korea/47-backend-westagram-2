//routes/index.js

const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const dataRouter = require("./dataRouter");
const fixDataRouter = require("./fixDataRouter");
router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/datas", dataRouter.router);
router.use("/fixDatas",fixDataRouter.router);
module.exports = router;