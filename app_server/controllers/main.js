var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://hypermedia-group9-studyguide.herokuapp.com/";
}



/* homepage */
module.exports.homepage = function (req, res) {
    console.log(req.session.userType);
    res.render('index', {title: 'Student', userType: req.session.userType});
};

module.exports.homepageVisitor = function (req, res) {
    console.log(req.session.userType);
    res.render('index', {title: 'Visitor', userType: req.session.userType});
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

module.exports.notAvailable = function (req, res) {
    res.render('error', { "message": "You are not allowed to use this service", "error": { "status": 550, "stack": "Switch to student in order to use this service." }});
};