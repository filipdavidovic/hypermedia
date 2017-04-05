var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};

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

        if (!(faculties instanceof Array)) {
            message = "API lookup error";
            faculties = [];
        } else {
            if (!faculties.length) {
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
            headerActive: "home",
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

        if (!(faculties instanceof Array)) {
            message = "API lookup error";
            faculties = [];
        } else {
            if (!faculties.length) {
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
            headerActive: "faculties",
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

        if (response.statusCode === 200) {
            res.render('faculty', {
                title: faculty.name,
                pageHeader: {
                    title: faculty.name,
                    strapline: faculty.description
                },
                faculty: faculty,
                headerActive: "faculties",
                userType: req.session.userType
            });
        } else {
            _showError(req, res, response.statusCode);
        }
    });
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

        if (response.statusCode === 200) {
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
    res.send("Single Master - Visitor");
};

module.exports.notebook = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Notebook",
            strapline: "TU/e Notebook"
        },
        content: '<p class="basic-text">In the 2016-2017 academic year, the purchase price of a notebook (including accessories, warranty, service and insurance) will be € 1.400,-. Every student will pay € 830,- and will sign an obligation document for the remaining other € 570,-.</p>' +
        '<h2 class="basic-title align-left">Subsidy</h2>' +
        '<p class="basic-text">As not every student can afford a notebook, the TU/e will pay part of the purchase and maintenance costs of the notebook. The part that the TU/e pays for you, will become a gift if you study at the TU/e for over three years or graduate earlier.</p>' +
        '<h2 class="basic-title align-left">How do I participate?</h2>' +
        '<p class="basic-text">In order to participate in the notebook scheme, the following is required:</p>' +
        '<ul class="basic-text">' +
            '<li>Indicate that you would like to participate in the notebook scheme on your TU/e enrollment form.</li>' +
            '<li>Your contribution should be paid by August the 1st at the latest.</li>' +
            '<li>Your enrollment should be fully completed.</li>' +
            '<li>You will receive an invitation to collect your notebook a week prior to the collection date at the latest. This invitation will state whether you need to make additional arrangements before collecting your notebook, and if so, what you need to do.</li>' +
        '</ul>' +
        '<h2 class="basic-title align-left">Notebook distribution</h2>' +
        '<p class="basic-text">You can collect your notebook from TU/e one week prior to the start of the academic year. Notebooks for the 2016–2017 academic year will be distributed on Thursday, September 1, 2016. You will receive a written invitation to collect your notebook. A letter will be sent to you before this date containing your username and password with which you can log onto the TU/e network. </p>' +
        '<p class="basic-text">All students are expected to collect their notebooks in person. However, should this be impossible for you, it is possible to authorize someone else to collect your notebook on your behalf. If you wish to do this, check out the box on the side.</p>',
        headerActive: "study",
        accordionStudyActive: "notebook",
        sideboxes: [{
            title: "In order to authorize someone else to collect your notebook, you need to:",
            body: '<ul class="basic-text">' +
                '<li>Print out the authorization form.</li>' +
                '<li>Complete and sign the authorization form (both the student and the authorized person must sign the form).</li>' +
                '<li>The authorized person arrives at the time indicated on the invitation.</li>' +
            '</ul>' +
            '<p class="basic-text">The authorized person submits the authorization form and photocopies of their and the student’s proof of identity (the original IDs should also be presented). The form is checked against the proof of identification before the authorized person signs the relevant contracts and collects the notebook.</p>'
        }],
        userType: req.session.userType
    });
};

module.exports.enrollment = function (req, res) {
    res.render('organization', {
        pageHeader: {
            title: "Enrollment",
            strapline: "Do you want to enroll to TU/e? Then this is the right page for you!"
        },
        content: '<p class="basic-text">University\'s allow you to enroll as a student, part-time student, external student or as a contract student. As a student, you may participate in study programs, take exams, participate in sports events, make use of study guidance, etc. Only full-time students with the Dutch nationality (barring a few exceptions) are eligible for a student grant.</p>' +
        '<p class="basic-text">If you are commencing your studies at the TU/e, you must register in <a href="http://www.studielink.nl">Studielink</a> before May 1. In order to register in Studielink, you must first get a <a href="http://www.digid.nl">DigiD</a>. If you do not already have one, please contact the Dutch tax office on time and request one. Please note it takes several days for the tax office to process your request.</p>' +
        '<p class="basic-text">Once you have registered in Studielink, your enrollment in the TU/e is not complete. You can only officially be registered at the TU/e if you have met the registration requirements (admission and payment of tuition fees). In that event, you will receive the TU/e campus card (your student card or university ID) and a login account. The account gives you access to the digital education and ICT facilities of the TU/e. You will be given an e-mail address and access to the digital education system.</p> ' +
        '<h2 class="basic-title align-left">Enrollment procedure for first-year students</h2>' +
        '<ul class="basic-text">' +
            '<li>Enroll for the study program of your choice through <a href="http://www.studielink.nl">Studielink</a> before May 1.</li>' +
            '<li>Check whether your e-mail address is correct in Studielink, because that is the address the TU/e will be using to send you messages for the time being.</li>' +
            '<li>Choosing the right study program is very important. The TU/e has a compulsory academic career check to help you assess whether your choice of study program is correct. After registration, you will receive a message about the academic career check from the study program you enrolled for.</li>' +
            '<li>In July 2017, you will receive the TU/e enrollment form. In addition, you will receive an e-mail about the Orientation Week and information about applying for a notebook computer.</li>' +
            '<li>If you are not sure whether your prior education gives you access to the study program of your choice, please check the admission requirements.</li>' +
            '<li>As of June 2017, you can choose your method of payment through Studielink and arrange your tuition fee for the academic year of 2017-2018. Your enrollment will only be finalized once the TU/e has received payment or authorization for a direct debit order concerning the tuition fee. For more information about payments and tuition fees, click here.</li>' +
            '<li>Once you have enrolled at the TU/e, you will receive a login account that gives you access to the digital education and ICT facilities of the TU/e. Moreover, you will be given an e-mail address and access to the digital education system of the TU/e. After your enrollment has been finalized, your student card (university ID) will be sent to your home address.</li>' +
            '<li>You can check the status of your enrollment request through Studielink under the heading \'my programs\'. Check Studielink regularly to see whether you have received any messages from us concerning your enrollment.</li>' +
            '<li>Reserve the week of August 21 to 25, 2017 in your agenda for the <a href="https://www.tue.nl/en/education/studying-at-tue/introduction-week/">Orientation Week</a> at the TU/e. During this week, you will receive essential information on studying at the TU/e, meet your coach and your fellow students, and learn about student life in Eindhoven.</li>' +
        '</ul> ',
        headerActive: "organization",
        "accordionOrganizationActive": "enrollment",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};