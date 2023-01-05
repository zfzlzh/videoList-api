/*
 * @Author: zfz
 * @Date: 2021-11-19 14:00:56
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-23 10:30:05
 * @Description: update
 */
var createError = require('http-errors');
// const PORT = 8090
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let routesList = require('./routes')
const pool = require('./pool/pool');
const consoleColor = require('./public/javascripts/consoleColor')
const common = require('./public/javascripts/common')
global.pool = pool
global.path = path
global.consoleColor = consoleColor
global.common = common
var app = express();
// 解决跨域
app.use(cors());
app.use(express.json());
// 路由集合
routesList(app)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态文件指向，获取静态文件时的地址样式为 127.0.0.1(ip):3000(port)/images/adminImg.png
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
