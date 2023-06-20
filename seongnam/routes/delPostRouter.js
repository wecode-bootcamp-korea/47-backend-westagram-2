//routes/delPostRouter.js
const express = require('express');
const delPostController = require('../controllers/delPostController');

const router = express.Router();
console.log(1);
router.delete('/:postId',delPostController.delPostController);
module.exports = {
    router
}