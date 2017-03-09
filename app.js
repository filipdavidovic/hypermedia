var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('express-session');
// var sassMiddleware = require('node-sass-middleware');
require('./app_api/models/db');

var router = require('./app_server/routes/mainRouter');
var apiRouter = require('./app_api/routes/apiRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cookieSession({secret: "hypermedia", resave: false, saveUninitialized: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(sassMiddleware({
//     src: path.join(__dirname, 'public', 'stylesheets'),
//     dest: path.join(__dirname, 'public', 'stylesheets'),
//     debug: true,
//     outputStyle: 'compressed'
// }));

app.use('/', router);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// TODO: think about the study guide forum!