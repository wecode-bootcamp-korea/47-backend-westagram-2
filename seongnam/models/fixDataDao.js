//models/fixDataDao
const appDataSource = require('./serverOn');


const fixDataDao = async (userId) => {
    try{
        const GroupByJoin = await appDataSource.appDataSource.query(
            `
            SELECT
                users.id,
                users.profile_image,
                JSON_ARRAYAGG(JSON_OBJECT(
                    'postingId', posts.id,
                    'postingImageUrl', posts.postingImageUrl,
                    'postingContent', posts.content,
                    'userId', posts.user_id
                )) AS postings
            FROM
                users
            JOIN
                posts ON users.id = posts.user_id
            WHERE
                users.id = ?
            GROUP BY
                users.id, users.profile_image;
            `,[userId]);
        ;
        return GroupByJoin;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    fixDataDao
}