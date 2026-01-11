const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const initDbM = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.
            connect(`${process.env.DBM_TYPE}://${process.env.DBM_HOST}:${process.env.PORTM_DB}/${process.env.DBM_NAME}`)
            .then(db => console.log("Db is conected moongose",db.connection.name));
    } catch (error) { console.log(error) }
}

module.exports = initDbM;