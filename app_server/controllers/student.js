var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://hypermedia-group9-studyguide.herokuapp.com";
}

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};

/* homepage */
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
            title: "TU/e Study Guide",
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

        res.render('faculties', {
            title: "TU/e Faculties",
            pageHeader: {
                title: "Faculties",
                strapline: "Faculties of the TU/e"
            },
            faculties: faculties,
            message: message,
            userType: req.session.userType
        });
    });
};

module.exports.singleFaculty = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var faculty = body;

        if(response.statusCode === 200) {
            res.render('faculty', {
                title: faculty.name,
                pageHeader: {
                    title: faculty.name,
                    strapline: faculty.description
                },
                faculty: faculty,
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.bachelor = function (req, res) {
    res.send("Bachelor - Student");
};

module.exports.premaster = function (req, res) {
    res.send("Premaster - Student");
};

module.exports.master = function (req, res) {
    res.send("Master - Student");
};

module.exports.singleBachelor = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var bachelor = body;

        if(response.statusCode === 200) {
            console.log(bachelor);
            res.render('program', {
                title: bachelor.name,
                pageHeader: {
                    title: bachelor.name,
                    strapline: bachelor.description
                },
                target: bachelor,
                type: {
                    bachelor: true,
                    premaster: false,
                    master: false
                },
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.singlePremaster = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/premaster/' + req.params.premasterid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var premaster = body;

        if(response.statusCode === 200) {
            console.log(premaster);
            res.render('program', {
                title: premaster.name,
                pageHeader: {
                    title: premaster.name,
                    strapline: premaster.description
                },
                target: premaster,
                type: {
                    bachelor: false,
                    premaster: true,
                    master: false
                },
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.singleMaster = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/master/' + req.params.masterid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var master = body;

        if(response.statusCode === 200) {
            console.log(master);
            res.render('program', {
                title: master.name,
                pageHeader: {
                    title: master.name,
                    strapline: master.description
                },
                target: master,
                type: {
                    bachelor: false,
                    premaster: false,
                    master: true
                },
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.forum = function (req, res) {
    var requestOptions, path;

    path = '/api/forum';

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var forums = body;
        var message;

        if(!(forums instanceof Array)) {
            message = "API lookup error";
            forums = []
        } else {
            if(!forums.length) {
                message = "No forums found";
            }
        }

        res.render('forum', {
            title: "TUe Forums",
            pageHeader: {
                title: "Forum",
                strapline: "Welcome to TUe Forums"
            },
            forums: forums,
            message: message,
            userType: req.session.userType
        });
    });
};

module.exports.getOneForum = function (req, res) {
    var requestOptions, path;

    path = '/api/forum/' + req.params.forumid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var forum = body;
        var message;

        if(err) {
            message = "API lookup error";
            forum = null;
        } else {
            if(!forum.length) {
                message = "No forums found";
            }
        }

        res.render('subforum', {
            title: forum.title,
            pageHeader: {
                title: forum.title,
                strapline: "Welcome to " + forum.title
            },
            forum: forum,
            message: message,
            userType: req.session.userType
        });
    });
};

module.exports.getOnePost = function (req, res) {
    var requestOptions, path;

    path = '/api/forum/' + req.params.forumid + '/' + req.params.postid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var postfetch = body;

        if(response.statusCode === 200) {
            res.render('post', {
                title: postfetch.post.title + " - TU/e Forum",
                pageHeader: {
                    title: postfetch.post.title,
                    strapline: postfetch.post.description
                },
                target: postfetch,
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

// ORGANIZATION
module.exports.advisorsTutors = function (req, res) {
    res.send("Advisors & Tutors");
};

module.exports.rulesRegulations = function (req, res) {
    res.send("Rules & Regulations");
};

module.exports.campusCard = function (req, res) {
    res.send("Campus Card");
};

// STUDY
module.exports.freeSoftware = function (req, res) {
    res.send("Free Software");
};

module.exports.academicYear = function (req, res) {
    res.send("Academic Year");
};