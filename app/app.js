const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(routes);

module.exports = app;