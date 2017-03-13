var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://hypermedia-group9-studyguide.herokuapp.com/";
}

module.exports.homepage = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties';

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var faculties = body;
        var message;

        if(!(faculties instanceof Array)) {
            message = "API lookup error";
            faculties = [];
        } else {
            if(!faculties.length) {
                message = "No faculties found";
            }
        }

        res.render('index', {
            title: "Visitor",
            pageHeader: {
                title: "Home",
                strapline: "Homepage of TU/e Study Guide"
            },
            faculties: faculties,
            message: message,
            userType: req.session.userType
        });
    });
};

module.exports.faculties = function (req, res) {

};

module.exports.bachelor = function (req, res) {
    res.send("Bachelor - Visitor");
};

module.exports.premaster = function (req, res) {
    res.send("Premaster - Visitor");
};

module.exports.master = function (req, res) {
    res.send("Master - Visitor");
};

module.exports.singleBachelor = function (req, res) {
    res.send("Single Bachelor - Visitor");
};

module.exports.singlePremaster = function (req, res) {
    res.send("Single Premaster - Visitor");
};

module.exports.singleMaster = function (req, res) {
    res.send("Single Master - Visitor");
};
