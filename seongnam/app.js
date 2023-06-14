const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require("dotenv")
dotenv.config()

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
        console.log("Error during Data Source initialization!",err)
    appDataSource.destroy();
    })
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', function (req, res, next) {
    res.json({message : 'pong'})
    })
    
app.listen(3000, function () {
    'listening on port 3000'
    })