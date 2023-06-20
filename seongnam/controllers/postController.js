//controller/postController.js

const postService = require('../services/postService');

const postUp = async(req,res) =>{
    try{
        const data = req.body;
        if(!data.content || !data.user_id){
            return res.status(400).json({message : 'KEY_ERROR'});
        }
        await postService.postUp(data.content,data.user_id,data.postingImageUrl);
        return res.status(201).json({message : "POSTUP_SUCCESS"});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    postUp
}