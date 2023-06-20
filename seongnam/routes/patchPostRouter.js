//routes/patchPostRouter.js

const express = require('express');
const patchPostController = require('../controllers/patchPostController');

const router = express.Router();
router.patch('/:postId',patchPostController.patchPostController);
module.exports = {
    router
}