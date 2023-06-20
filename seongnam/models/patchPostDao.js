//models/fixDataDao
const { DataSource } = require('typeorm');
const fixDatas = require('../controllers/fixDataController');
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


const patchPostDao = async (content,user_id,postId) => {
    try{
        const patchPost = await appDataSource.query(
            `
            UPDATE posts SET content = ? , user_id =
            ? WHERE id = ?;
            `,[content, user_id, postId]);
        ;
        return patchPost;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}
module.exports = {
    patchPostDao
}