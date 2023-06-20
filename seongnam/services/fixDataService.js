//service/fixDataService.js
const fixDataDao = require('../models/fixDataDao');
// fixDataDao.
const fixDataService = (userId) => {
    try{
        return fixDataDao.fixDataDao(userId);
    }
catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
        }
}

module.exports = {
    fixDataService
}