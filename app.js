var express = require('express');
var path = require('path');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
// var sassMiddleware = require('node-sass-middleware');
require('./app_api/models/db');

var router = require('./app_server/routes/mainRouter')(passport);
var apiRouter = require('./app_api/routes/apiRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
app.use(cookieSession({secret: "hypermedia", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(sassMiddleware({
//     src: path.join(__dirname, 'public', 'stylesheets'),
//     dest: path.join(__dirname, 'public', 'stylesheets'),
//     debug: true,
//     outputStyle: 'compressed'
// }));

app.use(flash());

app.use(function(req, res, next) {
    res.locals.messages = req.flash();
    next();
});

var initPassport = require('./passport/init');
initPassport(passport);

app.use('/', router);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    var data = {
        message: err.message,
        error: {
            status: err.status
        }
    };
    if(err.status !== 404) {
        data.error.stack = err.stack;
    }
    res.render('error', data);
});

module.exports = app;

// TODO: if possible add email verification for forum users
// TODO: add remember me to forum user login, use a passport strategy if available