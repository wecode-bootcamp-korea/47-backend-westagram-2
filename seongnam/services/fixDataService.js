//service/fixDataService.js
const fixDataDao = require('../models/fixDataDao');
// fixDataDao.
function fixDatas() {
    try{
    return fixDataDao.fixData();
    }
catch(err){
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
    }
}

module.exports = {
    fixDatas
}