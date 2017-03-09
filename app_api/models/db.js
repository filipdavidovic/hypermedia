var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/hypermedia-group9';
if (process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://admin:admin@ds125060.mlab.com:25060/hypermedia-group9'; // update to use process.env.MONGODB_URI
}
mongoose.connect(dbURI);

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through " + msg);
        callback();
    })
};


// LISTEN TO TERMINATIONS
process.once('SIGUSR2', function () {
    gracefulShutdown("nodemon restart", function () {
        process.kill(process.pid, "SIGUSR2");
    });
});

process.on('SIGINT', function () {
    gracefulShutdown("app termination", function () {
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    gracefulShutdown("Heroku termination", function () {
        process.exit(0);
    });
});


// LOG CHANGES TO MONGOOSE CONNECTION
mongoose.connection.on('connected', function () {
    console.log("Mongoose connected to " + dbURI);
    console.log("NODE_ENV = " + process.env.NODE_ENV);
});

mongoose.connection.on('error', function (err) {
    console.log("Mongoose connection error: " + err + ".");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose disconnected.");
});

require('./faculties');
require('./forum');