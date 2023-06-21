//models/likeUpDao

const appDataSource = require('./serverOn');

const createLikeDao = async (user_id, post_id) => {
    try{
        return await appDataSource.appDataSource.query(
            `
            INSERT INTO likes(
                user_id,
                post_id
            ) VALUES (?,?);
            `,
            [user_id, post_id]
        );
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    createLikeDao
}