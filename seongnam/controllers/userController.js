//controller/userController.js

const userService = require('../services/userService');

const signUp = async(req,res) =>{
    try{
        const data = req.body;
        if(!data.name || !data.email || !data.password){
            return res.status(400).json({message : 'KEY_ERROR'});
        }
        await userService.signUp(data.name,data.email,data.password);
        return res.status(201).json({message : "SIGNUP_SUCCESS"});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    signUp
}