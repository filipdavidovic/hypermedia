var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quartile: {type: Number, required: true}
});

var yearSchema = new mongoose.Schema({
    yearNumber: {type: Number, required: true},
    yearSubjects: [subjectSchema]
});

var facultiesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    identification: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true},
    subjects: [yearSchema]
});

mongoose.model('Faculty', facultiesSchema, 'faculties');