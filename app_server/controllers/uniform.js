var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://hypermedia-group9-studyguide.herokuapp.com/";
}

module.exports.notAvailable = function (req, res) {
    res.render('error', { "message": "You are not allowed to use this service", "error": { "status": 550, "stack": "Switch to student in order to use this service." }});
};

// ORGANIZATION
module.exports.map = function (req, res) {
    res.send("Map");
};

module.exports.contact = function (req, res) {
    res.send("Contact");
};

module.exports.studentForADay = function (req, res) {
    res.send("Student For a Day");
};

// STUDY
module.exports.electives = function (req, res) {
    res.send("Electives");
};

module.exports.notebook = function (req, res) {
    res.send("Notebook");
};

module.exports.canvas = function (req, res) {
    res.send("Canvas");
};

module.exports.timetablesTimeslots = function (req, res) {
    res.send("Timetables & Timeslots");
};

module.exports.planapp = function (req, res) {
    res.send("PlanApp");
};

module.exports.internationals = function (req, res) {
    res.send("Internationals");
};