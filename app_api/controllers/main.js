var mongoose = require('mongoose');

var Faculty = mongoose.model('Faculty');
var Forum = mongoose.model('Forum');
var User = mongoose.model('User');

var doAddPost = function (req, res, forum) {
    if(!forum) {
        console.log("*** not found");
        sendJsonResponse(res, 404, {
            "message": "forumid not found"
        });
    } else {
        console.log("*** pushing...");
        forum.posts.push({
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            creatorId: req.body.user._id.toString()
        });
        forum.save(function (err, forum) {
            var thisPost;
            if(err) {
                console.log("**** ERROR: " + err);
                sendJsonResponse(res, 404, err);
            } else {
                thisPost = forum.posts[forum.posts.length-1];
                sendJsonResponse(res, 201, thisPost);
            }
        });
    }
};

var doAddAnswer = function (req, res, forum, post) {
    if(!post) {
        console.log("*** forumid or postid not found");
        sendJsonResponse(res, 404, {
            "message": "forumid or postid not found"
        });
    } else {
        console.log("*** Pushing...");
        post.answers.push({
            "author": req.body.user.lastName + " " + req.body.user.initials,
            "answerBody": req.body.answerBody,
            "creatorId": req.body.user._id.toString()
        });

        console.log("*** Saving...");
        forum.save(function (err, forum) {
            if(err) {
                console.log("*** ERROR: " + err);
                sendJsonResponse(res, 404, err);
            } else {
                console.log("*** SUCCESS");
                sendJsonResponse(res, 201, post);
            }
        });
    }
};

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

module.exports.getOneFaculty = function (req, res) {
    console.log("Getting single faculty");
    if(req.params && req.params.facultyid) {
        Faculty
            .findById(req.params.facultyid)
            .exec(function (err, faculty) {
                if(!faculty) {
                    console.log("facultyid");
                    sendJsonResponse(res, 404, {
                        "message": "facultyid not found"
                    });
                    return;
                } else if(err) {
                    console.log("err");
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log("Sending..");
                sendJsonResponse(res, 200, faculty);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, facultyid and bachelorid are both required"
        });
    }
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
        Forum
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

module.exports.createPost = function (req, res) {
    if(!req.params.forumid) {
        console.log("*** forumid required");
        sendJsonResponse(res, 404, {
            "message": "Not found, forumid required."
        });
    } else {
        Forum
            .findById(req.params.forumid)
            .exec(function (err, forum) {
                if(err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    console.log("*** do add review");
                    doAddPost(req, res, forum);
                }
            });
    }
};

module.exports.createAnswer = function (req, res) {
    if(!req.params.forumid || !req.params.postid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, forumid and postid are both required."
        });
    } else {
        Forum
            .findById(req.params.forumid)
            .select('title posts _id')
            .exec(function (err, body) {
                if(err) {
                    console.log("*** ERROR: " + err);
                    sendJsonResponse(res, 404, err);
                } else {
                    var post = body.posts.id(req.params.postid);

                    console.log("*** Sending to doAddAnswer method");
                    doAddAnswer(req, res, body, post);
                }
            });
    }
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.deleteAnswer = function (req, res) {
    if(!req.params.forumid || !req.params.postid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, forumid and postid both required"
        });
        return;
    }
    Forum
        .findById(req.params.forumid)
        .select('posts')
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
            if(forum.posts && forum.posts.length > 0) {
                if (!forum.posts.id(req.params.postid)) {
                    sendJsonResponse(res, 404, {
                        "message": "postid not found"
                    });
                } else {
                    var post = forum.posts.id(req.params.postid);
                    if (!req.body.answerId) {
                        sendJsonResponse(res, 404, {
                            "message": "Not found, answerid required"
                        });
                        return;
                    }

                    var thisAnswer;
                    var returnFourOFour = true;
                    post.answers.forEach(function (answer) {
                        if (answer._id.toString() === req.body.answerId.toString()) {
                            thisAnswer = answer;
                            returnFourOFour = false;
                            if (thisAnswer.creatorId != req.body.user._id) {
                                sendJsonResponse(res, 401, {
                                    "message": "You are unauthorized to do this."
                                });
                            } else {
                                thisAnswer.remove();
                                forum.save(function (err) {
                                    if (err) {
                                        sendJsonResponse(res, 404, err);
                                        return;
                                    }
                                    sendJsonResponse(res, 204, null);
                                });
                            }
                        }
                    });

                    if(returnFourOFour) {
                        sendJsonResponse(res, 404, {
                            "message": "Not found"
                        });
                    }
                }
            }
        });
};