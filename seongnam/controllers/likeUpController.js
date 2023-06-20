//controller/likeController.js

const likeUpService = require('../services/likeUpService');

const likeUpController = async(req,res) =>{
    try{
        const data = req.body;
        if(!data.user_id || !data.post_id){
            return res.status(400).json({message : 'KEY_ERROR'});
        }
        await likeUpService.likeUpService(data.user_id,data.post_id);
        return res.status(201).json({message : "likeUP_SUCCESS"});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 400).json({ message : err.message});
    }
};

module.exports = {
    likeUpController
}