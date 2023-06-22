const { createConnection } = require("typeorm");
const userDao = require("../models/userDao");

const bcrypt = require("bcrypt");

const signUp = async (name, email, password, phoneNumber, profileImage) => {
    const pwValidation = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})");

    if (!pwValidation.test(password)) {
        const err = new Error("PASSWORD_IS_NOT_VALID");
        err.statusCode = 409;
        throw err;
    }

    const saltRounds = 12;
    const makeHash = async (password, saltRounds) => {
        return await bcrypt.hash(password, saltRounds);
    };

    const hashedPassword = await makeHash(password, saltRounds);

    return await userDao.createUser(name, email, hashedPassword, phoneNumber, profileImage);
};

const signIn = async (email, password) => {
    const userPasswordResult = await userDao.userPassword(email);

    if (userPasswordResult.length > 0) {
        const userPassword = userPasswordResult[0].password;

        const passwordMatch = await bcrypt.compare(password, userPassword);

        if (!passwordMatch) {
            const err = new Error("Invalid User");
            err.statusCode = 401;
            throw err;
        }
        return;
    } else {
        const err = new Error("NOT_USER_FOUND");
        err.statusCode = 404;
        throw err;
    }
};

module.exports = { signUp, signIn };
