//models/userDao
const appDataSource = require('./serverOn');

const createUserDao = async (name, email, password) => {
    try{
        return await appDataSource.appDataSource.query(
            `
            INSERT INTO users(
                name,
                email,
                password
            ) VALUES (?,?,?);
            `,
            [name,email,password]
        );
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
const userDataDao = async (userId) => {
    try{
        const UserData = await appDataSource.appDataSource.query(
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
        return UserData;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
const allUserDataDao = async () => {
    try{
        const AllUser = await appDataSource.appDataSource.query(
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
        return AllUser;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    createUserDao, userDataDao, allUserDataDao
}