//service/likeService.js
const likeUpDao = require('../models/likeUpDao')

const likeUpService = async(user_id, post_id) => {
    // password validation using REGEX
    const createPost = await likeUpDao.createLikeDao(
        user_id,
        post_id
    );
    return createPost;
}

module.exports = {
    likeUpService
}