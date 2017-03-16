var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    "author": {type: String, "default": "Anonymous"},
    "answerBody": {type: String, required: true},
    "createdOn": {type: Date, "default": Date.now()}
});

var postSchema = new mongoose.Schema({
    "title": {type: String, required: true},
    "author": {type: String, "default": "Anonymous"},
    "description": {type: String, required: true},
    "answers": [answerSchema],
    "createdOn": {type: Date, "default": Date.now()}
});

var forumSchema = new mongoose.Schema({
    "_id": {type: String, required: true},
    "title": {type: String, required: true},
    "description": {type: String, "default": "This is a forum"},
    "posts": [postSchema]
});

mongoose.model('Forum', forumSchema, 'forum');