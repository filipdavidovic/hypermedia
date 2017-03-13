var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quartile: {type: Number, required: true}
});

var yearSchema = new mongoose.Schema({
    yearNumber: {type: Number, required: true},
    yearSubjects: [subjectSchema]
});

var bachelorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true}
});

var premasterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true}
});

var masterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true}
});

var facultiesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    identification: {type: String, required: true},
    bachelor: [bachelorSchema],
    premaster: [premasterSchema],
    master: [masterSchema]
    // , https://static.tue.nl/fileadmin/_processed_/3/f/csm_meisjemetrobot_01_1718ebf138.jpg - Happy Robot/CS
    // subjects: [yearSchema]
});

mongoose.model('Faculty', facultiesSchema, 'faculties');


// .findOne({identification: ...})