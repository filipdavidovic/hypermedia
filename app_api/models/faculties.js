var mongoose = require('mongoose');

var bachelorSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true}
});

var premasterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true}
});

var masterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true}
});

var facultiesSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    bachelor: [bachelorSchema],
    premaster: [premasterSchema],
    master: [masterSchema]
});

mongoose.model('Faculty', facultiesSchema, 'faculties');
