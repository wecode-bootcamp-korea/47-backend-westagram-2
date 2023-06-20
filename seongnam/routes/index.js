//routes/index.js

const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const dataRouter = require("./dataRouter");
const fixDataRouter = require("./fixDataRouter");
const delPostRouter = require("./delPostRouter");
const patchPostRouter = require("./patchPostRouter");
const likeRouter = require("./likeUpRouter");
router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/datas", dataRouter.router);
router.use("/fixDatas",fixDataRouter.router);
router.use("/postDel",delPostRouter.router);
router.use("/patchPost",patchPostRouter.router);
router.use("/like",likeRouter.router);
module.exports = router;