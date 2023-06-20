//controller/patchPostController.js

const patchPostService = require('../services/patchPostService');

const patchPostController = async(req,res) =>{
    try{
        const postId = req.params.postId;
        const result = await patchPostService.patchPostService(req.body.content, req.body.user_id, postId);

        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    patchPostController
}
