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