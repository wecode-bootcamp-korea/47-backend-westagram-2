//routes/postRouter.js

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();
router.post('/postup',postController.postUp);
module.exports = {
    router
}