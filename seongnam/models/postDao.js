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
module.exports = {
    createPostDao
}