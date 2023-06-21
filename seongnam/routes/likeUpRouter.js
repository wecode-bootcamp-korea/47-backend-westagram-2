//routes/likeRouter.js

const express = require('express');
const likeUpController = require('../controllers/likeUpController');

const router = express.Router();
router.post('',likeUpController.likeUpController);
module.exports = {
    router
}