//routes/fixDataRouter.js
const express = require('express');
const fixDataController = require('../controllers/fixDataController');

const router = express.Router();

router.get('/:userId',fixDataController.fixDataController);
module.exports = {
    router
}