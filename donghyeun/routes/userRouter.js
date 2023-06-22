const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
const auth = require("../utils/auth");

router.post("/signup", userController.signUp);
router.post("/signin", auth.verifyToken, userController.signIn);

module.exports = { router };
