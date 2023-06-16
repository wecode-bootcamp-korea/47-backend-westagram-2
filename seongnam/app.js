const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { DataSource } = require('typeorm');

const app = express();

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

const port = process.env.PORT;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.post("/users/signup", async(req,res) =>{
    try{
        const data = req.body;
        const insertQuery = `INSERT INTO users (
            name,
            email,
            password
            ) 
        VALUES (
            ?, 
            ?,
            ?
        )`;
        const appData = [ data.name, data.email, data.password ];
        const result = await appDataSource.query(insertQuery, appData);
        res.status(201).json(result);
    }catch(error){
        console.error("Error executing SQL query:", error);
        res.status(400).json({ message: "Error saving data" });
    }
})

app.post("/write",async(req,res) =>{
    try{
        const data = req.body;
        if(
            await appDataSource.query(`
            SELECT EXISTS(SELECT 1 FROM users WHERE id = ?)
            `,[data.user_id])){
            await appDataSource.query(`INSERT INTO posts (
            content,
            user_id
            ) 
        VALUES (
            ?, 
            ?
        )`,
        [data.content,data.user_id]);
            res.status(201).json({message : "postCreated"});
        }else{
            res.status(201).json({message : "user_id is not exists"});
        }
        }catch(error){
            console.error("Error executing SQL query:", error);
            res.status(400).json({ message: "Error saving data" });
        }
    })
app.get("/data", async(req,res) =>{   
    try{
    const InnerJoinQuery = `
    SELECT users.id AS userId, 
    users.profile_image AS userProfileImage, 
    posts.id AS postingId, posts.postingImageUrl AS postingImageUrl, 
    posts.content AS postingContent 
    FROM users 
    INNER JOIN posts 
    ON users.id = posts.user_id
    `
    const result = await appDataSource.query(InnerJoinQuery);
    res.status(201).json(result);
    }catch(error){
        console.error("Error executing SQL query:", error);
        res.status(400).json({ message: "Error saving data" });
    }
});

app.get("/userdata", async(req,res) => {
    try{
        const GroupByJoin = `
        select users.id, 
        users.profile_image, 
        JSON_ARRAYAGG(JSON_OBJECT('postingId', posts.id, 
        'postingImageUrl', posts.postingImageUrl, 
        'postingContent', posts.content, 
        'userId', posts.user_id)) 
        AS postings
        FROM users JOIN posts ON users.id = posts.user_id 
        GROUP BY users.id, users.profile_image;
        `
        const result = await appDataSource.query(GroupByJoin);
        res.status(201).json(result);
    }catch(error){
        console.error("Error executing SQL query:", error);
        res.status(400).json({ message: "Error saving data" });
    }
})

app.get("/:userid/:postid", async(req,res) => {
    try{
    const userid = req.params.userid;
    const postid = req.params.postid;

    const result = await appDataSource.query(`
    select * from posts where posts.user_id = ? and posts.id = ?;
    `,[userid,postid]);
    res.status(201).json(result);
    }catch(error){
        console.error("Error SQL query:", error);
        res.status(500).json({ message: "Error saving data" });
    }
})

app.post("/postDel",async(req,res) =>{
    try{
    const data = req.body;
    const result = await appDataSource.query(
        `
        DELETE FROM posts WHERE user_id = ? AND id = ?;
        `,[data.id, data.postid]);
        res.status(201).json("posting Deleted");
    }catch(error){
        console.error("Error SQL query:", error);
        res.status(500).json({ message: "Error saving data" });
    }
})
app.post("/likes", async(req,res) => {
    try{
        const data = req.body;
        const result = await appDataSource.query(
        `
        INSERT INTO likes (
            user_id,
            post_id
            ) 
        VALUES (
            ?, 
            ?
        )
        `,[data.user_id, data.post_id]);
        res.status(201).json("likeCreated");
    }catch(error){
        console.error("Error SQL query:", error);
        res.status(500).json({ message: "Error saving data" });
    }
})


app.listen(port, function () {
    `listening on port ${port}`
    })