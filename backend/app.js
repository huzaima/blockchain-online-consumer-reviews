const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors')

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.disable('etag');

app.use('/', indexRouter);

module.exports = app;
