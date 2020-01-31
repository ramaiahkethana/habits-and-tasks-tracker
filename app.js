import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'
import bodyParser from 'body-parser';
import config from './config/app';
import routes from './routes';

// db instance creates connection to mongodb
import db from './config/database';
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.options("*", cors())

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/' + config.app.api_version, routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).json({
    success: false,
    message: 'Page not Not Found',
    error_code: 'NOT_FOUND'
  })
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)

  return res.status(err.statusCode || 500).json({
    success: false,
    message: res.locals.message || 'Something went wrong',
    error_code: res.locals.error.errorCode || 'UNKNOWN_ERROR'
  })
});

module.exports = app;
