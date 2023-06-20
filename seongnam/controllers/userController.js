//controller/userController.js

const userService = require('../services/userService');

const signUpController = async(req,res) =>{
    try{
        const data = req.body;
        if(!data.name || !data.email || !data.password){
            return res.status(400).json({message : 'KEY_ERROR'});
        }
        await userService.signUpService(data.name,data.email,data.password);
        return res.status(201).json({message : "SIGNUP_SUCCESS"});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 400).json({ message : err.message});
    }
};

module.exports = {
    signUpController
}