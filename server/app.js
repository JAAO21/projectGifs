const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const initDbM = require('./bdmoongose');

const app = express();


//middlegares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//init db moongose
initDbM(app);

//routes
require('./src/routes/index.js')(app);
 



module.exports = app;
