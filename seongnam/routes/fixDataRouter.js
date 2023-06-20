//routes/fixDataRouter.js
const express = require('express');
const dataController = require('../controllers/fixDataController');

const router = express.Router();

router.get('/:userId',dataController.fixDatas1);
module.exports = {
    router
}