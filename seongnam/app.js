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
app.post("/join",async(req,res) =>{
try{
    const data = req.body;
    console.log(data)
    const insertQuery = `INSERT INTO users (
        user_id,
        pw,
        pwcheck,
        user_name,
        phonenumber,
        email 
        ) 
    VALUES (
        "${data.user_id}", 
        ${data.pw}, 
        ${data.pwcheck},
        "${data.user_name}",
        ${data.phonenumber},
        "${data.email}"
    )`;
    if(data.pw == data.pwcheck){
        await appDataSource.query(insertQuery);
        res.status(201).json({message : "UserCreated"});
    }else{
        res.status(201).json({message : "pw and pwcheck is not same"});
    }
    }catch(error){
        console.error("Error executing SQL query:", error);
        res.status(500).json({ message: "Error saving data" });
    }
})

app.post("/write",async(req,res) =>{
    try{
        const data = req.body;
        console.log(data)
        const insertQuery = `INSERT INTO messages (
            author_id,
            author_message
            ) 
        VALUES (
            "${data.author_id}", 
            "${data.author_message}" 
        )`;
        if(
            await appDataSource.query(`
            SELECT EXISTS(SELECT 1 FROM users WHERE user_id = '${data.author_id}' )
            `) != "Empty set"
        ){
            await appDataSource.query(insertQuery);
            res.status(201).json({message : "postCreated"});
        }else{
            res.status(201).json({message : "user_id is not exists"});
        }
        }catch(error){
            console.error("Error executing SQL query:", error);
            res.status(500).json({ message: "Error saving data" });
        }
    })

app.listen(3000, function () {
    'listening on port 3000'
    })