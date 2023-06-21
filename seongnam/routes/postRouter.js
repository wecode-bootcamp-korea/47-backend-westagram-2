//routes/postRouter.js

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();
router.post('',postController.postUpController);

router.delete('/:postId',postController.delPostController);
router.patch('/:postId',postController.patchPostController);

module.exports = {
    router
}
