var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};

if(process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://hypermedia-group9-studyguide.herokuapp.com";
}

module.exports.notAvailable = function (req, res) {
    res.render('error', {
        "message": "You are not allowed to use this service",
        "error": {"status": 550, "stack": "Switch to student in order to use this service."}
    });
};

// ORGANIZATION
module.exports.map = function (req, res) {
    res.render('organization', {
        pageHeader: {
            title: "Map",
            strapline: "This is the map of TU/e"
        },
        content: '<p class="basic-text">The TU/e is working toward a modern, green TU/e Campus. This means that we stimulate sustainable transport. TU/e Campus is located in the center of Eindhoven, at about eight minutes’ walk from the central station, which makes it easily accessible by public transport.</p>',
        headerActive: "organization",
        accordionOrganizationActive: "map",
        map: "/img/TUePlattegrond.jpg",
        sideboxes: [],
        userType: req.session.userType
    });
};

module.exports.contact = function (req, res) {
    res.render('organization', {
        pageHeader: {
            title: "Contact",
            strapline: ""
        },
        content: "<p class='basic-text'>The campus of Eindhoven Technical University lies in the center of Eindhoven, a 10 minutes' walking distance from the train station. On the compact green campus are all the University buildings, as well as companies, research institutes and the Student Sport Center. Most of the buildings are connected through elevated walkways. As a result, the TU/e is the best accessible University for disabled persons.</p>",
        headerActive: "organization",
        accordionOrganizationActive: "contact",
        sideboxes: [{
            title: "Visiting address",
            body: "<p class='basic-text'>Den Dolech 2</p><p class='basic-text'>5612 AZ Eindhoven</p><p class='basic-text'>The Netherlands</p><p class='basic-text'><b>Tel.</b> <a class='basic-text' href='tel:00310402474747'>+31 (0)40 247 47 47</a></p>"
        }, {
            title: "Postal address",
            body: "<p class='basic-text'>Education and Student Service Center</p><p class='basic-text'>P.O. Box 513</p><p class='basic-text'>5600 MB Eindhoven</p><p class='basic-text'>The Netherlands</p>"
        }, {
            title: "Contact the web team",
            body: "<p class='basic-text'>Please contact the web team if you have a question that relates to our website:</p><p class='basic-text'><b>Email.</b> <a class='basic-text' href='mailto:studiegids@tue.nl'>studiegids@tue.nl</a></p>"
        }],
        userType: req.session.userType
    });
};

module.exports.studentForADay = function (req, res) {
    res.render('organization', {
        pageHeader: {
            title: "Student for a Day",
            strapline: "Be a student for a day via the TU/e program student-for-a-day"
        },
        content:  '<p class="basic-text">Are you in the fifth or sixth year of your VWO (pre-university education), did you already visit an <a href="https://www.tue.nl/en/education/study-information-activities/for-vwo-students-pre-university-education/information-days/">Information Day</a> and would you like to find out what it\' s like to be a student for a day? Then join a student for a day of the program you\' re interested in. You\' ll attend lectures and instructions, visit labs and other practical lecture rooms and find your way around the campus of Eindhoven University of Technology.</p><p class="basic-text">The dates of the Orientation days are set each year by the individual programs.</p><h2 class="basic-title align-left">Would you like to visit an Orientation day?</h2> <p class="basic-text">Then <a href="https://start.tue.nl/public/login">login</a> in our registration database, choose the Orientation day of the program you are interested in. The staff of that program will then contact you to invite you to one of the Orientation days.</p><p class="basic-text">Is your preferred orientation day full? New orientation days are planned on a regular basis, so please come back at a later moment to register.</p>',
        headerActive: "organization",
        accordionOrganizationActive: "student-for-a-day",
        sideboxes: [{
            title: "Orientation day tip of Anouk Pilon",
            body: '<h3>Student Industrial Engineering & Management Science</h3><p class="basic-text">"If you don\'t yet know which program you want to do or where you want to study, it\'s a good idea to visit an Orientation day. You\'ll be able to see for yourself what it\'s like at the university, and find out if the program you\'re interested in is right for you. If you choose TU/e, then you should also take part in the introduction week. You\'ll find out all about TU/e, the city and all the different student associations. After that, you\'ll soon feel at home in Eindhoven!"</p> '
        }, {
            title: "Experience Day Data Science",
            body: '<p class="basic-text">Since the bachelor’s program Data Science is a joint bachelor\'s program of Tilburg University and TU/e, you cannot subscribe for an Experience Day via the website of TU/e. <a href="https://www.tilburguniversity.edu/nl/onderwijs/bacheloropleidingen/studiekeuze/meeloopdag/data-science/">Registration for the Experience Days Data Science</a> is only possible via the Tilburg University website.</p> '
        }],
        userType: req.session.userType
    });
};

// STUDY
module.exports.electives = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Electives",
            strapline: "Electives that you can choose as a student of TU/e"
        },
        content: "<p class='basic-text'>TU/e offers a broad range of elective courses for all students. In the Bachelor College, students can choose elective courses from all faculties. This way, students can shape their own education to their needs and wishes. There is a broad range of elective courses for every major. At the TU/e, you are completely in charge of your own specialization. Every major can be shaped to your specific interests.</p>",
        headerActive: "study",
        accordionStudyActive: "electives",
        sideboxes: [],
        userType: req.session.userType
    });
};

module.exports.canvas = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Canvas",
            strapline: "TU/e Canvas"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        headerActive: "study",
        accordionStudyActive: "canvas",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};

module.exports.timetablesTimeslots = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Timetables & Timeslots",
            strapline: "Timetables and Timeslots on the TU/e"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        headerActive: "study",
        accordionStudyActive: "timetables-timeslots",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};

module.exports.planapp = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "PlanApp",
            strapline: "TU/e PlanApp"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        headerActive: "study",
        accordionStudyActive: "planapp",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};

module.exports.internationals = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Internationals",
            strapline: "Internationals at the TU/e"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        headerActive: "study",
        accordionStudyActive: "internationals",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};
