//service/userService.js
const userDao = require('../models/userDao')
const signUpService = async(name, email, password) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
        `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})`
    );
    if(!pwValidation.test(password)){
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 400;
        throw err;
    }
    const createUser = await userDao.createUserDao(
        name,
        email,
        password
    );
    return createUser;
}

const userDataService = (userId) => {
    try{
        return userDao.userDataDao(userId);
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
        }
}

function allUserDataService() {
    try{
        console.log(userDao.allUserDataDao());
        return userDao.allUserDataDao();
    }
catch(err){
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;    
    }
}
module.exports = {
    signUpService, userDataService, allUserDataService
}