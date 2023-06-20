//controller/fixDataController.js

const fixDataService = require('../services/fixDataService');

const fixDatas1 = async(req,res) =>{
    try{
        const result = await fixDataService.fixDatas();
        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    fixDatas1 
}