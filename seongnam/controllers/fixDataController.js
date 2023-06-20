//controller/fixDataController.js

const fixDataService = require('../services/fixDataService');

const fixDataController = async(req,res) =>{
    try{
        const userId = req.params.userId;
        console.log("userId:",userId);
        const [result] = await fixDataService.fixDataService(userId);

        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    fixDataController
}
