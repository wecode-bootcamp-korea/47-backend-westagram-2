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


app.post("/join",async(req,res) =>{
try{
    const data = req.body;
    console.log(data)
    const insertQuery = `INSERT INTO users (
        id,
        name,
        password,
        pwcheck
        ) 
    VALUES (
        ${data.id},
        "${data.name}", 
        "${data.password}",
        "${data.pwcheck}"
    )`;
    if(data.password == data.pwcheck){
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
        const insertQuery = `INSERT INTO posts (
            title,
            user_id
            ) 
        VALUES (
            "${data.title}", 
            ${data.user_id}
        )`;
        if(
            await appDataSource.query(`
            SELECT EXISTS(SELECT 1 FROM users WHERE id = '${data.user_id}')
            `)){
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
app.get("/data", async(req,res) =>{   
    try{
    const InnerJoinQuery = `
    SELECT users.id AS userId, 
    users.profile_image AS userProfileImage, 
    posts.id AS postingId, posts.postingImageUrl AS postingImageUrl, 
    posts.title AS postingContent 
    FROM users 
    INNER JOIN posts 
    ON users.id = posts.user_id
    `
    const result = await appDataSource.query(InnerJoinQuery);
    res.status(201).json(result);
    }catch(error){
        console.error("Error executing SQL query:", error);
        res.status(500).json({ message: "Error saving data" });
    }
});

app.get("/userdata", async(req,res) => {
    try{
        const GroupByJoin = `
        select users.id, 
        users.profile_image, 
        JSON_ARRAYAGG(JSON_OBJECT('postingId', posts.id, 
        'postingImageUrl', posts.postingImageUrl, 
        'postingContent', posts.title, 
        'userId', posts.user_id)) 
        AS postings
        FROM users JOIN posts ON users.id = posts.user_id 
        GROUP BY users.id, users.profile_image;
        `
        const result = await appDataSource.query(GroupByJoin);
        res.status(201).json(result);
    }catch(error){
        console.error("Error executing SQL query:", error);
        res.status(500).json({ message: "Error saving data" });
    }
})

app.listen(3000, function () {
    'listening on port 3000'
    })