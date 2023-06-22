const { createConnection } = require("typeorm");
const userDao = require("../models/userDao");

const bcrypt = require("bcrypt");

const { use } = require("../routes");

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

const signIn = async (email, password) => {};

module.exports = { signUp, signIn };
