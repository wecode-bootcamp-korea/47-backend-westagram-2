//controller/dataController.js

const dataService = require('../services/dataService');

const getDatass = async(req,res) =>{
    try{
        const result = await dataService.getDatas();
        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    getDatass
}