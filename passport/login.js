var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        User.findOne({'username': username}, function (err, user) {
            // In case of error, return error using done method
            if (err) {
                console.log("ERROR: " + err);
                return done(err);
            }
            // Username does not exist, log error and redirect back
            if (!user) {
                console.log('User not found with username ' + username);
                return done(null, false, req.flash('message', 'User not found with username ' + username));
            }
            // User exists but wrong password, log the error
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid username and password combination'));
            }
            // success, correct username and password combination
            return done(null, user);
        });
    }));
};