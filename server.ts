//import
import express = require('express');
import routes from './user/index';

//require
require('dotenv').config();
const db = require('./database');
const app  = express();
const cors = require('cors');
const PORT: number = 8080;
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("App is listening on port : " + PORT);
});