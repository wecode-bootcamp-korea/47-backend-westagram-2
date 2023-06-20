//controller/dataController.js

const { response } = require('express');
const dataService = require('../services/dataService');

const getDataController = async(req,res) =>{
    try{
        const result = await dataService.getDataService();
        return res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return res.status(err.statusCode || 400).json({ message : err.message});
    }
};

module.exports = {
    getDataController
}