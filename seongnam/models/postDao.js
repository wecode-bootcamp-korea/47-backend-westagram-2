//models/postDao

const appDataSource = require('./serverOn');

const createPostDao = async (content, user_id, postingImageUrl) => {
    try{
        return await appDataSource.appDataSource.query(
            `
            INSERT INTO posts(
                content,
                user_id,
                postingImageUrl
            ) VALUES (?,?,?);
            `,
            [content,user_id,postingImageUrl]
        );
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
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

const delPostDao = async (postId) => {
    try{
        const delQuery = await appDataSource.appDataSource.query(
            `
            DELETE FROM posts WHERE id = ?;
            `,
            [postId]
          );
        ;
        return delQuery;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    createPostDao, patchPostDao, delPostDao
}