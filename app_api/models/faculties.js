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
var generalPremasterSchema = new mongoose.Schema({
    body: {type: String, required: true},
    courses: [subjectSchema]
});


var bachelorSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true},
    general: generalBachelorSchema,
    professionalDevelopment: {type: String, required: true},
    examinationSchedules: {type: String, required: true},
    graduationDeadlines: {type: String, required: true}
});

var premasterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true},
    general: generalPremasterSchema,
    conditionsForEnrollment: {type: String, required: true},
    visitorBody: {type: String, required: true}
});

var masterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    banner: {type: String, required: true},
    general: {type: String, required: true},
    coachingProfessionalSkills: {type: String, required: true},
    internshipExchange: {type: String, required: true},
    honorsProgram: {type: String, required: true},
    graduation: {type: String, required: true},
    examinationSchedules: {type: String, required: true},
    graduationDeadlines: {type: String, required: true},
    priorBachelors: {type: String, required: true},
    regulations: {type: String, required: true},
    visitorBody: {type: String, required: true}
});

var facultiesSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    bachelor: [bachelorSchema],
    premaster: [premasterSchema],
    master: [masterSchema],
    contact: {type: String, required: true},
    color: {type: String, required: true}
});

mongoose.model('Faculty', facultiesSchema, 'faculties');
