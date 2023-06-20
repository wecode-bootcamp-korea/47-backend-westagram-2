//models/delPostDao
const appDataSource = require('./serverOn');



const delPostDao = async (postId) => {
    try{
        const delQuery = await appDataSource.appDataSource.query(
            `
            DELETE FROM posts WHERE id = ?;
            `,
            [postId]
          );
        ;
        return delQuery;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    delPostDao
}