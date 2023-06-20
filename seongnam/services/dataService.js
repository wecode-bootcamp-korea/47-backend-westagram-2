//service/dataService.js
const dataDao = require('../models/dataDao');

function getDatas() {
    try{
    return dataDao.getData()
    }
catch(err){
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;    
    }
}
module.exports = {
    getDatas
}