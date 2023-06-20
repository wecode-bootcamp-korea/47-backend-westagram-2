//service/delPostService.js
const delPostDao = require('../models/delPostDao');
// fixDataDao.
const delPostservice = (postId)=>{
    try{
        console.log(delPostDao.delPostDao(postId));
        return delPostDao.delPostDao(postId);
    }
catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
        }
}

module.exports = {
    delPostservice
}