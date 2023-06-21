//routes/userRouter.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.post('',userController.signUpController);
router.get('/:userId',userController.userDataController);
router.get('',userController.allUserDataController);
module.exports = {
    router
}