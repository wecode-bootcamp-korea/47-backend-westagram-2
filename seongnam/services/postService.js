//service/postService.js
const postDao = require('../models/postDao')

const postUp = async(content, user_id, postingImageUrl) => {
    // password validation using REGEX
    const createPost = await postDao.createPost(
        content,
        user_id,
        postingImageUrl
    );
    return createPost;
}

module.exports = {
    postUp
}