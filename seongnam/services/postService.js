//service/postService.js
const postDao = require('../models/postDao');

const postUpService = async(content, user_id, postingImageUrl) => {
    const createPost = await postDao.createPostDao(
        content,
        user_id,
        postingImageUrl
    );
    return createPost;
}

const patchPostService = (content, user_id, postId) => {
    try{
        return postDao.patchPostDao(content, user_id, postId);
    }
catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
        }
}
const delPostservice = (postId)=>{
    try{
        return postDao.delPostDao(postId);
    }
catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
        }
}
module.exports = {
    postUpService, patchPostService, delPostservice

}