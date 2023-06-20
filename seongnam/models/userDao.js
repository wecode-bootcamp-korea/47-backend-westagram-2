//models/userDao
const appDataSource = require('./serverOn');

const createUserDao = async (name, email, password) => {
    try{
        return await appDataSource.appDataSource.query(
            `
            INSERT INTO users(
                name,
                email,
                password
            ) VALUES (?,?,?);
            `,
            [name,email,password]
        );
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    createUserDao
}