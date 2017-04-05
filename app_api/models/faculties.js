var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    quartile: {type: String, required: true},
    timeslots: {type: String, required: true}
});

var generalBachelorSchema = new mongoose.Schema({
    body: {type: String, required: true},
    courses: {
        firstYear: [subjectSchema],
        secondYear: [subjectSchema],
        thirdYear: [subjectSchema]
    }
});

var bachelorSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true},
    general: generalBachelorSchema,
    professionalDevelopment: {type: String, required: true},
    examinationSchedules: {type: String, required: true},
    graduationDeadlines: {type: String, required: true},
    contact: {type: String, required: true}
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
