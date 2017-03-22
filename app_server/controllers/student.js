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

        var data = {
            title: "TUe Forums",
            pageHeader: {
                title: "Forum",
                strapline: "Welcome to TUe Forums"
            },
            forums: forums,
            message: message,
            userType: req.session.userType
        };

        if(req.user) {
            data.userName = req.user.lastName + " " + req.user.initials;
        }

        res.render('forum', data);
    });
};

module.exports.addPost = function (req, res) {
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

        res.render('addPost', {
            title: "Add a post to " + forum.title,
            pageHeader: {
                title: forum.title
            },
            forum: forum,
            error: req.query.err,
            message: message,
            userType: req.session.userType
        });
    });
};

module.exports.doAddPost = function (req, res) {
    var requestOptions, path, postdata;

    path = '/api/forum/' + req.params.forumid + '/add-new-post';

    postdata = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description
    };

    if(req.user) {
        postdata.user = req.user;
    }

    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };

    if(!postdata.title || !postdata.description) {
        res.redirect('/forum/' + req.params.forumid + '/add-new-post?err=val');
    } else {
        request(requestOptions, function (err, response, body) {
            if(response.statusCode === 201) {
                res.redirect('/forum/' + req.params.forumid + '/' + body._id);
            } else {
                _showError(req, res, response.statusCode);
            }
        });
    }
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

        var loggedIn = !!req.user;

        res.render('subforum', {
            title: forum.title,
            pageHeader: {
                title: forum.title,
                strapline: "Welcome to " + forum.title
            },
            forum: forum,
            message: message,
            userType: req.session.userType,
            loggedIn: loggedIn
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
            var loggedIn = !!req.user;

            var data = {
                title: postfetch.post.title + " - TU/e Forum",
                pageHeader: {
                    title: postfetch.post.title,
                    strapline: postfetch.post.description
                },
                target: postfetch,
                error: req.query.err,
                userType: req.session.userType,
                loggedIn: loggedIn
            };

            if(req.user) {
                data.userId = req.user._id;
            } else {
                data.userId = "visitor";
            }

            res.render('post', data);
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.doChangeAnswer = function (req, res) {
    var requestOptions, path, postdata;

    path = '/api/forum/' + req.params.forumid + '/' + req.params.postid;

    if(req.body._method === "DELETE") { // DELETE
        postdata = {
            answerId: req.body.answerId
        };

        if(req.user) {
            postdata.user = req.user;
        } else {
            _showError(req, res, 401);
        }

        requestOptions = {
            url: apiOptions.server + path,
            method: "DELETE",
            json: postdata
        };

        request(requestOptions, function (err, response, body) {
            if(response.statusCode === 204) {
                console.log("**** BODY: " + body);
                res.redirect('/forum/' + req.params.forumid + '/' + req.params.postid);
            } else {
                _showError(req, res, response.statusCode);
            }
        });
    } else { // POST
        postdata = {
            answerBody: req.body.answerBody
        };

        if(req.user) {
            postdata.user = req.user;
        } else {
            _showError(req, res, 401);
        }

        requestOptions = {
            url: apiOptions.server + path,
            method: "POST",
            json: postdata
        };

        if(!postdata.answerBody) {
            res.redirect('/forum/' + req.params.forumid + '/' + req.params.postid + '?err=val');
        } else {
            request(requestOptions, function (err, response, body) {
                if(response.statusCode === 201) {
                    res.redirect('/forum/' + req.params.forumid + '/' + body._id);
                } else {
                    _showError(req, res, response.statusCode);
                }
            });
        }
    }
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

// USER
module.exports.register = function (req, res) {
    var data = {
        errorMessage: req.flash('message')[0]
    };
    res.render('register', data);
};

module.exports.login = function (req, res) {
    var data = {
        errorMessage: req.flash('message')[0]
    };
    res.render('login', data);
};

module.exports.doAddUser = function (req, res) {
    var requestOptions, path, postdata;

    path = '/api/forum/add-user';

    postdata = {
        lastName: req.body.lastName,
        initials: req.body.initials,
        username: req.body.username,
        password: req.body.password
    };

    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };



    if((true)) { // !postdata.lastName || (postdata.username.match(usernameRegEx) === null) || !postdata.password || !postdata.initials
        req.flash('message', 'Invalid Input');

    } else {
        request(requestOptions, function (err, response, body) {
            if(response.statusCode === 201) {
                res.redirect('/forum');
            } else {
                _showError(req, res, response.statusCode);
            }
        });
    }
};

module.exports.deleteOneAnswer = function (req, res) {
    res.redirect('/');
};