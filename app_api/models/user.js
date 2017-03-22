var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ // TODO: add s-number verification
    username: {type: String, required: true, index: {unique: true}},
    lastName: {type: String, required: true},
    initials: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema, 'users');