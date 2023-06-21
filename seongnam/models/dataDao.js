//models/dataDao

const appDataSource = require('./serverOn');

const getDataDao = async () => {
    try{
        const result = await appDataSource.appDataSource.query(
            `
            SELECT users.id AS userId, 
            users.profile_image AS userProfileImage, 
            posts.id AS postingId, posts.postingImageUrl AS postingImageUrl, 
            posts.content AS postingContent 
            FROM users 
            INNER JOIN posts 
            ON users.id = posts.user_id
            `)
        ;
        return result;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    getDataDao
}