const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router.js');
require('dotenv').config();

const port = process.env.PORT || 3400;

const app = express();

app.use(bodyParser.json());
app.use('/', router);
app.use(express.static(path.join(__dirname, '/../client/dist')));


app.listen(port);

module.exports = app;
