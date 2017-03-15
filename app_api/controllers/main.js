var mongoose = require('mongoose');

var Faculty = mongoose.model('Faculty');
var Forum = mongoose.model('Forum');

module.exports.getFaculties = function (req, res) {
    Faculty
        .find()
        .exec(function (err, faculties) {
            if(!faculties) {
                sendJsonResponse(res, 404, {
                    "message": "No faculties found"
                });
                return;
            } else if(err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, faculties);
        });
};

module.exports.getOneBachelor = function (req, res) {
    console.log("Getting single bachelor.");
    if(req.params && req.params.facultyid && req.params.bachelorid) {
        Faculty
            .findById(req.params.facultyid)
            .exec(function (err, faculty) {
                var response, program;
                if(!faculty) {
                    sendJsonResponse(res, 404, {
                        "message": "facultyid not found"
                    });
                    return;
                } else if(err){
                    sendJsonResponse(res, 404, err)
                }
                if(faculty.bachelor && faculty.bachelor.length > 0) {
                    program = faculty.bachelor.id(req.params.bachelorid);
                    if(!program) {
                        sendJsonResponse(res, 404, {
                            "message": "Program not found!"
                        });
                    } else {
                        response = {
                            faculty: {
                                name: faculty.name,
                                _id: req.params.facultyid
                            },
                            program: program
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No bachelor found."
                    });
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, facultyid and bachelorid are both required"
        });
    }
};

module.exports.getOnePremaster = function (req, res) {
    console.log("Getting single premaster.");
    if(req.params && req.params.facultyid && req.params.premasterid) {
        Faculty
            .findById(req.params.facultyid)
            .exec(function (err, faculty) {
                var response, program;
                if(!faculty) {
                    console.log("*** facultyid not found.");
                    sendJsonResponse(res, 404, {
                        "message": "facultyid not found"
                    });
                    return;
                } else if(err){
                    console.log("*** Error: " + err);
                    sendJsonResponse(res, 404, err)
                }

                if(faculty.premaster && faculty.premaster.length > 0) {
                    program = faculty.premaster.id(req.params.premasterid);
                    if(!program) {
                        console.log("*** Program not found");
                        sendJsonResponse(res, 404, {
                            "message": "Program not found!"
                        });
                    } else {
                        response = {
                            faculty: {
                                name: faculty.name,
                                _id: req.params.facultyid
                            },
                            program: program
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    console.log("*** Program not found");
                    sendJsonResponse(res, 404, {
                        "message": "No premaster found."
                    });
                }
            });
    } else {
        console.log("*** Not found, facultyid and premasterid are both required");
        sendJsonResponse(res, 404, {
            "message": "Not found, facultyid and premasterid are both required"
        });
    }
};

module.exports.getOneMaster = function (req, res) {
    console.log("Getting single master.");
    if(req.params && req.params.facultyid && req.params.masterid) {
        Faculty
            .findById(req.params.facultyid)
            .exec(function (err, faculty) {
                var response, program;
                if(!faculty) {
                    console.log("*** facultyid not found.");
                    sendJsonResponse(res, 404, {
                        "message": "facultyid not found"
                    });
                    return;
                } else if(err){
                    console.log("*** Error: " + err);
                    sendJsonResponse(res, 404, err)
                }

                if(faculty.master && faculty.master.length > 0) {
                    program = faculty.master.id(req.params.masterid);
                    if(!program) {
                        console.log("*** Program not found");
                        sendJsonResponse(res, 404, {
                            "message": "Program not found!"
                        });
                    } else {
                        response = {
                            faculty: {
                                name: faculty.name,
                                _id: req.params.facultyid
                            },
                            program: program
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    console.log("*** Program not found");
                    sendJsonResponse(res, 404, {
                        "message": "No premaster found."
                    });
                }
            });
    } else {
        console.log("*** Not found, facultyid and premasterid are both required");
        sendJsonResponse(res, 404, {
            "message": "Not found, facultyid and premasterid are both required"
        });
    }
};

module.exports.getForums = function (req, res) {
    Forum
        .find()
        .exec(function (err, forums) {
            if(!forums) {
                sendJsonResponse(res, 404, {
                    "message": "No forums found"
                });
                return;
            } else if(err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, forums);
        });
};

module.exports.getOneForum = function (req, res) {
    if(req.params && req.params.forumid) {
        Forum
            .findById(req.params.forumid)
            .exec(function (err, forum) {
                if(!forum) {
                    sendJsonResponse(res, 404, {
                        "message": "forumid not found"
                    });
                    return;
                } else if(err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, forum);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No forumid in request."
        });
    }
};

module.exports.getOnePost = function (req, res) {
    if(req.params && req.params.forumid && req.params.postid) {
        Loc
            .findById(req.params.forumid)
            .exec(function (err, forum) {
                var response, post;
                if(!forum) {
                    sendJsonResponse(res, 404, {
                        "message": "forumid not found."
                    });
                    return;
                } else if(err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                post = forum.posts.id(req.params.postid);
                if(!post) {
                    sendJsonResponse(res, 404, {
                        "message": "postid not found."
                    });
                } else {
                    response = {
                        forum: {
                            name: forum.title,
                            id: req.params.forumid
                        },
                        post: post
                    };
                    sendJsonResponse(res, 200, response);
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, forumid and postid are both required."
        });
    }
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};