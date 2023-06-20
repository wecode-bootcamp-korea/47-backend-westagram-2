//controller/delPostController.js

const delPostService = require('../services/delPostService');

const delPostController = async(req,res) =>{
    try{
        const postId = req.params.postId;
        const result = await delPostService.delPostservice(postId);
        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 400).json({ message : err.message});
    }
};

module.exports = {
    delPostController
}
