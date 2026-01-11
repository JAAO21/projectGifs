const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();


app.listen(process.env.PORT || 4000, () => {
    console.log(`App listening on htpp://${process.env.HOST}:${process.env.PORT}/${process.env.APP_NAME} `);
});

