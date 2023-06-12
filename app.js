const dotenv = require("dotenv")

dotenv.config()

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
 
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_USER:", process.env.DB_USERNAME);
 console.log("DB_PASS:", process.env.DB_PASSWORD);
  const express = require('express')
  const logger = require('morgan')
  const cors = require('cors')
  const app = express()
 
  app.use(cors())
  app.use(logger('dev'));
  app.get('/ping', function (req, res, next) {
    res.json({message: 'pong'})
  })
  app.post('/pingaa', function(req,res,next){
          res.json({message : 's'});
  })
  const port = 3000;
  app.listen(port, function () {
    console.log(`server listening on port ${port}`)
  })

