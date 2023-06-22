const userService = require("../services/userService");

const signUp = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, profileImage } = req.body;

        if (!name || !email || !password || !phoneNumber || !profileImage) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        await userService.signUp(name, email, password, phoneNumber, profileImage);
        return res.status(201).json({
            message: "SIGNUP_SUCCESS",
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "KEY_ERROR" });
    }

    try {
        await userService.signIn(email, password);
        return res.status(200).json({ message: "SIGNIN_SUCCESS" });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = { signUp, signIn };
