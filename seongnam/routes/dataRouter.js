//routes/dataRouter.js

const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();
router.get('/getData',dataController.getDatass);
module.exports = {
    router
}