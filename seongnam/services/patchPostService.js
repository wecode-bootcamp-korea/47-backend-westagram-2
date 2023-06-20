//service/patchPostService.js
const patchPostDao = require('../models/patchPostDao');

const patchPostService = (content, user_id, postId) => {
    try{
        return patchPostDao.patchPostDao(content, user_id, postId);
    }
catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
        }
}

module.exports = {
    patchPostService
}