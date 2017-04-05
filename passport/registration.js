var LocalStrategy   = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('registration', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, username, password, done) {

        findOrCreateUser = function() {
            // find a user in Mongo with provided username
            User.findOne({ 'username' :  username }, function(err, user) {
                // In case of any error, return using the done method
                if (err){
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false, req.flash('message','User Already Exists'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.initials = req.body.initials;
                    newUser.lastName = req.body.lastName;

                    var usernameRegEx = /^s[0-9]{6}$/;
                    if(newUser.username.match(usernameRegEx) === null) {
                        return done(null, false, req.flash('message', 's-number'));
                    }

                    var passwordRegEx = /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$*+])[0-9a-zA-Z!@#$*+]{8,}/;
                    if(password.match(passwordRegEx) === null) {
                        return done(null, false, req.flash('message', 'password'));
                    }

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration successful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));

    // Generates hash using bCrypt
    var createHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }
};