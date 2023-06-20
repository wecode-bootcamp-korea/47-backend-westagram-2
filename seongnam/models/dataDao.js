//models/dataDao

const { DataSource } = require('typeorm');
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
        ("Error during Data Source initialization!",err)
    appDataSource.destroy();
    });
// console.log(1);
const getData = async () => {
    try{
        const result = await appDataSource.query(
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
        error.statusCode = 500;
        throw error;
    }
}
// console.log(2);
module.exports = {
    getData
}