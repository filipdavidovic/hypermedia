var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://hypermedia-group9-studyguide.herokuapp.com/";
}



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
            title: "Student",
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
            title: "Undergraduate programs",
            pageHeader: {
                title: "Undergraduate programs",
                strapline: "Major in English"
            },
            majors: faculties,
            message: message,
            userType: req.session.userType
        });
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
    res.send("Single Bachelor - Student");
};

module.exports.singlePremaster = function (req, res) {
    res.send("Single Premaster - Student");
};

module.exports.singleMaster = function (req, res) {
    res.send("Single Master - Student");
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

    // res.render('forum', {
    //     forums: [{
    //         "name": "Newbie Forum",
    //         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend augue sed dolor molestie sollicitudin. Etiam sed venenatis tellus, at tristique diam. Integer non sapien velit. Cras consectetur, ipsum sit amet luctus efficitur, eros metus sollicitudin sapien, in rhoncus nisl diam eu erat. Phasellus vel auctor libero. Cras faucibus a mauris in varius. Nulla pharetra lorem aliquam turpis vestibulum, porttitor luctus dolor rhoncus. Mauris vel vestibulum justo. Sed congue magna vel urna efficitur, a aliquam sem scelerisque. Nullam non lectus in felis mollis rutrum. Maecenas pulvinar mattis sapien, eu pellentesque tellus sagittis a. Donec et dignissim quam, sit amet viverra magna. Morbi vehicula lorem tellus, vitae bibendum augue consectetur quis. Quisque sodales posuere sapien quis cursus. Suspendisse tempor hendrerit mi, et finibus erat ullamcorper eu.",
    //         "postNumber": 350
    //     }, {
    //         "name": "Computer Science",
    //         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend augue sed dolor molestie sollicitudin. Etiam sed venenatis tellus, at tristique diam. Integer non sapien velit. Cras consectetur, ipsum sit amet luctus efficitur, eros metus sollicitudin sapien, in rhoncus nisl diam eu erat. Phasellus vel auctor libero. Cras faucibus a mauris in varius. Nulla pharetra lorem aliquam turpis vestibulum, porttitor luctus dolor rhoncus. Mauris vel vestibulum justo. Sed congue magna vel urna efficitur, a aliquam sem scelerisque. Nullam non lectus in felis mollis rutrum. Maecenas pulvinar mattis sapien, eu pellentesque tellus sagittis a. Donec et dignissim quam, sit amet viverra magna. Morbi vehicula lorem tellus, vitae bibendum augue consectetur quis. Quisque sodales posuere sapien quis cursus. Suspendisse tempor hendrerit mi, et finibus erat ullamcorper eu.",
    //         "postNumber": 123
    //     }]
    // });
};

module.exports.getOneForum = function (req, res) {
    var requestOptions, path;

    path = '/api/forum' + req.params.forumid;

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
