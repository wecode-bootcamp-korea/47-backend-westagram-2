//service/postService.js
const postDao = require('../models/postDao')

const postUpService = async(content, user_id, postingImageUrl) => {
    const createPost = await postDao.createPostDao(
        content,
        user_id,
        postingImageUrl
    );
    return createPost;
}

module.exports = {
    postUpService
}