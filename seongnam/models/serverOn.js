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

module.exports = {
    appDataSource
}   