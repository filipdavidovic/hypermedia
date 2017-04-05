var mongoose = require('mongoose');
var textgoose = require('textgoose');
var textSearch = require('mongoose-text-search');


var userSchema = new mongoose.Schema({ // TODO: add s-number verification
    username: {type: String, required: true, index: {unique: true}},
    lastName: {type: String, required: true},
    initials: {type: String, required: true},
    password: {type: String, required: true}
});


userSchema.index({username: 'text', lastName: 'text', initials: 'text'});
userSchema.plugin(textgoose);

mongoose.model('User', userSchema, 'users');

