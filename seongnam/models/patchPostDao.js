//models/fixDataDao
const appDataSource = require('./serverOn');


const patchPostDao = async (content,user_id,postId) => {
    try{
        const patchPost = await appDataSource.appDataSource.query(
            `
            UPDATE posts SET content = ? , user_id =
            ? WHERE id = ?;
            `,[content, user_id, postId]);
        ;
        return patchPost;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    patchPostDao
}