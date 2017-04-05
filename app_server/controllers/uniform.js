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

        if (response.statusCode === 200) {
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
                headerActive: "faculties",
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.singleBachelorGeneralInfo = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var bachelor = body;

        if (response.statusCode === 200) {
            console.log("Name: " + bachelor);
            console.log(bachelor.program);
            res.render('programGeneral', {
                title: bachelor.name,
                pageHeader: {
                    title: bachelor.program.name + " / General"
                },
                target: bachelor,
                programOrganizationActive: "general",
                baseUrl: '/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid,
                headerActive: "faculties",
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.singleBachelorProfessionalDevelopment = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var bachelor = body;

        if (response.statusCode === 200) {
            console.log("Name: " + bachelor);
            console.log(bachelor.program);
            res.render('programGeneric', {
                title: bachelor.name,
                pageHeader: {
                    title: bachelor.program.name + " / Professional Development"
                },
                target: bachelor,
                targetBody: bachelor.program.professionalDevelopment,
                programOrganizationActive: "professional-development",
                baseUrl: '/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid,
                headerActive: "faculties",
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.singleBachelorExaminationSchedules = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var bachelor = body;

        if (response.statusCode === 200) {
            console.log("Name: " + bachelor);
            console.log(bachelor.program);
            res.render('programGeneric', {
                title: bachelor.name,
                pageHeader: {
                    title: bachelor.program.name + " / Examination Schedules"
                },
                target: bachelor,
                targetBody: bachelor.program.examinationSchedules,
                programOrganizationActive: "examination-schedules",
                baseUrl: '/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid,
                headerActive: "faculties",
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

module.exports.singleBachelorGraduationDeadlines = function (req, res) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var bachelor = body;

        if (response.statusCode === 200) {
            console.log("Name: " + bachelor);
            console.log(bachelor.program);
            res.render('programGeneric', {
                title: bachelor.name,
                pageHeader: {
                    title: bachelor.program.name + " / Graduation Deadlines"
                },
                target: bachelor,
                targetBody: bachelor.program.graduationDeadlines,
                programOrganizationActive: "graduation-deadlines",
                baseUrl: '/faculties/' + req.params.facultyid + '/bachelor/' + req.params.bachelorid,
                headerActive: "faculties",
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
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

module.exports.mytue = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "MyTue",
            strapline: "TU/e Software - MyTue"
        },
        content: "<h2 class='basic-title align-left'>MyTU/e</h2><p class='basic-text'>MyTU/e provides an easy-to-use, personalized and effective system for you to manage everything you need to make a success of your learning and working at TU/e.<br>Via MyTU/e you can e.g. access:</p><ul class='basic-text'><li>Osiris: Osiris is the new student information system, that records all student data, from enrollment right through to graduation. You can use Osiris to view your grades, register for courses and examinations, and to keep track of your progress.</li><li>•Canvas: the new Learning Management system, supports you while doing your courses and projects. You can use it to hand in your deliverables and receive feedback from teachers. Teachers can e.g. publish course materials on Canvas.</li><li>Timetables and calenders: both a personal timetable and the agenda of the entire university can be found here.</li><li>Email</li><li>Print Balance</li><li>News and events from teh university</li><li>And many more..</li></ul>",
        headerActive: "study",
        accordionStudyActive: "mytue",
        sideboxes: [],
        userType: req.session.userType
    });
};

module.exports.timetablesTimeslots = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Timetables & Timeslots",
            strapline: "Timetables and Timeslots on the TU/e"
        },
        content: "<p class='basic-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
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
        content: "<h2 class='basic-title align-left'>PlanApp</h2><p class=’basic-text’>The TU/e <a href=’https://planapp.tue.nl/’>Planapp</a> is an ideal application to provide insights into your personal study choices. The TU/e Planapp makes it easy to see which choices must and can be made within your Bachelor’s program. The Planapp automatically shows which subjects can be chosen (based on your timetable). The Planapp provides information about which subjects are part of a USE or Elective package. Additionally, the Planapp provides more detailed information about a subject (ECTS, content, or learning goals). The chosen subjects can be dragged and dropped onto the desired place in the timetable.</p><h2 class='basic-title align-left'>Hints!</h2><ul class=’basic-text’><li>Start by picking your major (via “options” and “change major”).</li><li>To check which USE/Elective package is linked to a certain subject, a subject has to be selected. Then, the tab “planning” must be clicked to show which USE/Elective packages contains that specific subject.</li><li>After picking the subjects, the validity of your selection can be checked concerning the presence of a major and basic subject, checked for 180 ECTS, checked for presence and completeness of a USE package and the presence of coherent elective packages. Use the validate option via “Options” -> “Validate timetable”.</li></ul><p class='basic-text'>For questions or remarks about the Planapp or possible subject combinations, please contact roosters@tue.nl.</p>",
        headerActive: "study",
        accordionStudyActive: "planapp",
        sideboxes: [],
        userType: req.session.userType
    });
};

module.exports.internationals = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Internationals",
            strapline: "Internationals at the TU/e"
        },
        content: "<h2 class='basic-title align-left'>Internationals</h2><p class=’basic-text’>When you come to study at TU/e, some additional information is applicable for you as an international student. In the menu on the left, you can find the topics that can be relevant for you. </p><h2 class='basic-title align-left'>Town hall registration</h2><p class='basic-text'>One of the conditions to be able to keep your Dutch residence permit is that you are registered at the town hall. If you unregister the IND will be notified and they will cancel your residence permit immediately. This cancellation is not reversible and as of that moment you will be staying in the Netherlands illegally.</p><h2 class='basic-title align-left>Health insurance</h2><p class='basic-text>If you have a (part-time) job or paid internship in the Netherlands with which you earn more than 150 euro per month, you need to take out a basic healthcare insurance (basiszorgverzekering). You can request this insurance via the website of AON or with another insurance company. Information on other insurance companies can be found on the website Zorgwijzer.</p><h2 class='basic-title align-left'>Moving within Eindhoven</h2><p class='basic-text'>When you are moving within Eindhoven to a new address, you need to inform the town hall. You can only do this by making an appointment first: </p><ul class=’basic-text’> <li> Call (040) 238 6000. You will hear a recorded message in Dutch. The message asks you to press 1 for English.</li><li>Once you have done this the tape continues with other options, but you can immediately press 9 (you do not need to wait for the tape to end) to get someone on the line who speaks English and who can help you to make an appointment.</li></ul> <p class='basic-text'>An appointment for registration at city hall is possible Tuesdays through Fridays. Town hall address: Stadhuisplein 10, 5611 EM Eindhoven. </p><h2 class='basic-text'>Tax papers</h2><p class='basic-text'> <b>Why did I receive these forms?</b> There is a possibility that you will receive forms from the Dutch tax office (in a blue envelope and in Dutch). This is simply the tax office checking whether you are liable to pay income tax here in the Netherlands.</br><b>What should I do?</b>If you do not receive a blue envelope containing forms from the Dutch tax office, you don’t have to do anything! If you do receive a blue envelope containing forms from the Dutch tax office, you are obliged to fill them in and return them to the tax office by the date mentioned! Please fill in the official tax form and use the official envelop enclosed in the tax documents to return your form. Please do not ignore them as you will get into serious trouble with the Dutch government. Translation of the forms can be arranged via Angie Vorstermans. </p><h2 class='basic-title align-left'>Work permit</h2><p class='basic-text'> When you come to stay and study in the Netherlands, perhaps you also want to look for a (part)time job. If so, it is important to know all rules and conditions. It also may have other consequences which you should take into consideration. You will find all the information on <a href=’ https://www.tue.nl/en/education/studying-at-tue/practical-information-for-international-students/immigration-matters/work-permit/’>this website</a>.</p><h2 class='basic-title align-left'>Cancellation of residence permit card</h2><p class='basic-text'>By law TU/e needs to inform the IND within one month once a student is no longer enrolled. If you are no longer enrolled for other reasons than graduation, you must be aware that your residence permit will no longer be valid as of the date you are no longer enrolled. Even though the date on your card has not yet passed. You need to leave the country before your residence permit expires or else it can cause problems at the border. </p><h2 class='basic-title align-left'>No longer a student at TU/e</h2><p class='basic-text'> Once you have graduated there are a number of administrative matters you need to arrange.</p> <ul class=’basic-text’> <li>Inform the town hall about the date you are leaving the Netherlands.</li><li>If you have a Dutch bank account, you have to close the account before you leave. Contact the bank for the procedure.</li><li>If you have a Dutch residence permit, TU/e will inform the IND that you are no longer a student.</li></ul><p class='basic-text'> What will happen? </p> <ul class=’basic-text’> <li>Your enrolment is being cancelled because of graduation.</li><li>If your residence permit is still valid for 3 months or less after you have cancelled your enrolment, the residence permit will end with the date of the card. </li><li>The IND (Dutch Immigration Service) expects you to leave the country or arrange a different residence permit before it expires. </li><li>You will <b>not</b> get a confirmation letter from the IND about the cancellation. </li></ul> <p class='basic-text'><b>Cancellation of enrolment for another reason.</b> If a student cancels enrolment for another reason then graduation, the residence permit will immediately become invalid. You will be informed directly by the IND about the cancellation. You may appeal to the decision to cancel your residence permit. But this may only be useful when your enrolment has been cancelled for another reason then graduation.</br><b>Student insurance at AON</b> If you have a Dutch insurance with AON contact Peggy van de Voort to terminate this insurance. If you will be staying in the Netherlands, but not as a student, you will have to change your health insurance. This can be with AON or another health insurance. </p>",
        headerActive: "study",
        accordionStudyActive: "internationals",
        sideboxes: [],
        userType: req.session.userType
    });
};
