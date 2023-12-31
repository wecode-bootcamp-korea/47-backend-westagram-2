//controller/postController.js

const postService = require('../services/postService');

const postUpController = async(req,res) =>{
    try{
        const data = req.body;
        if(!data.content || !data.user_id){
            return res.status(400).json({message : 'KEY_ERROR'});
        }
        await postService.postUpService(data.content,data.user_id,data.postingImageUrl);
        return res.status(201).json({message : "POSTUP_SUCCESS"});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 400).json({ message : err.message});
    }
};
const delPostController = async(req,res) =>{
    try{
        const postId = req.params.postId;
        const result = await postService.delPostservice(postId);
        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 400).json({ message : err.message});
    }
};

const patchPostController = async(req,res) =>{
    try{
        const postId = req.params.postId;
        const result = await postService.patchPostService(req.body.content, req.body.user_id, postId);

        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 400).json({ message : err.message});
    }
};

module.exports = {
    postUpController, delPostController, patchPostController
}