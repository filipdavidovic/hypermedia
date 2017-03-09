var mongoose = require('mongoose');

var Forum = mongoose.model('Forum');

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