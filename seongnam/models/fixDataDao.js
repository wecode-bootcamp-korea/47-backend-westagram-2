//models/fixDataDao
const { DataSource } = require('typeorm');
const fixDatas = require('../controllers/fixDataController');
const user_id = fixDatas.fixDatas2;
const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.log("Error during Data Source initialization!",err)
    appDataSource.destroy();
    });


const fixDataDao = async (userId) => {
    try{
        const GroupByJoin = await appDataSource.query(
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
        error.statusCode = 500;
        throw error;
    }
}
module.exports = {
    fixDataDao
}