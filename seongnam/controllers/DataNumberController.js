//controller/dataController.js

const dataService = require('../services/fixDataService');
const fixDatas2 = async(req,res)=>{
    try{
        const userNumber = req.params.userNumber;
        return userNumber;
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = {
    fixDatas2
}