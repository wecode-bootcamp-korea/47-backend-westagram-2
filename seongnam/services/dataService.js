//service/dataService.js
const dataDao = require('../models/dataDao');

function getDataService() {
    try{
    return dataDao.getDataDao()
    }
catch(err){
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;    
    }
}
module.exports = {
    getDataService
}