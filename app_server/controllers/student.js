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
        title: title,
        content: content
    });
};

var doSingleMaster = function (req, res, type) {
    var requestOptions, path;

    path = '/api/faculties/' + req.params.facultyid + '/master/' + req.params.masterid;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var master = body;

        if (response.statusCode === 200) {
            console.log(master);

            var data = {
                title: master.name,
                pageHeader: {
                    title: master.program.name
                },
                target: master,
                targetBody: master.program.description,
                headerActive: "faculties",
                programOrganizationActive: type,
                baseUrl: '/faculties/' + req.params.facultyid + '/master/' + req.params.masterid,
                userType: req.session.userType
            };

            switch(type) {
                case "coaching-professional-skills":
                    data.targetBody = master.program.coachingProfessionalSkills;
                    data.pageHeader.title = data.pageHeader.title + " / Coaching & Professional Skills";
                    break;
                case "internship-exchange":
                    data.targetBody = master.program.internshipExchange;
                    data.pageHeader.title = data.pageHeader.title + " / Internship and Exchange";
                    break;
                case "honors-program":
                    data.targetBody = master.program.honorsProgram;
                    data.pageHeader.title = data.pageHeader.title + " / Honors Program";
                    break;
                case "graduation":
                    data.targetBody = master.program.graduation;
                    data.pageHeader.title = data.pageHeader.title + " / Graduation";
                    break;
                case "examination-schedules":
                    data.targetBody = master.program.examinationSchedules;
                    data.pageHeader.title = data.pageHeader.title + " / Examination Schedules";
                    break;
                case "graduation-deadlines":
                    data.targetBody = master.program.graduationDeadlines;
                    data.pageHeader.title = data.pageHeader.title + " / Graduation Deadlines";
                    break;
                case "prior-bachelors":
                    data.targetBody = master.program.priorBachelors;
                    data.pageHeader.title = data.pageHeader.title + " / Prior Bachelors";
                    break;
                case "regulations":
                    data.targetBody = master.program.regulations;
                    data.pageHeader.title = data.pageHeader.title + " / Regulations";
                    break;
                default:
                    data.targetBody = master.program.general;
                    data.pageHeader.title = data.pageHeader.title + " / General";
            }

            res.render('programMasterGeneric', data);
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

var doSinglePremaster = function (req, res, type) {
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

            var data  = {
                title: premaster.name,
                pageHeader: {
                    title: premaster.name
                },
                target: premaster,
                headerActive: "faculties",
                programOrganizationActive: type,
                baseUrl: '/faculties/' + req.params.facultyid + '/premaster/' + req.params.premasterid,
                userType: req.session.userType
            };

            if(type === "general") {
                data.targetBody = premaster.program.general.body;
                res.render('programPremasterGeneric', data);
            } else {
                data.targetBody = premaster.program.graduationDeadlines;
                res.render('programPremasterGeneric', data);
            }
        } else {
            _showError(req, res, response.statusCode);
        }
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

        if (!(faculties instanceof Array)) {
            message = "API lookup error";
            faculties = [];
        } else {
            if (!faculties.length) {
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
    res.send("Bachelor - Student");
};

module.exports.premaster = function (req, res) {
    res.send("Premaster - Student");
};

module.exports.master = function (req, res) {
    res.send("Master - Student");
};

module.exports.singlePremaster = function (req, res) {
    doSinglePremaster(req, res, "general");
};

module.exports.singlePremasterConditionsForEnrollment = function (req, res) {
    doSinglePremaster(req, res, "conditions-for-enrollment");
};

module.exports.singleMaster = function (req, res) {
    doSingleMaster(req, res, "general");
};

module.exports.singleMasterCurriculumStream = function (req, res) {
    // doSingleMaster(req, res, "general");
    res.send("CIAO");
};

module.exports.singleMasterCoachingProfessionalSkills = function (req, res) {
    doSingleMaster(req, res, "coaching-professional-skills");
};

module.exports.singleMasterInternshipExchange = function (req, res) {
    doSingleMaster(req, res, "internship-exchange");
};

module.exports.singleMasterHonorsProgram = function (req, res) {
    doSingleMaster(req, res, "honors-program");
};

module.exports.singleMasterGraduation = function (req, res) {
    doSingleMaster(req, res, "graduation");
};

module.exports.singleMasterExaminationSchedules = function (req, res) {
    doSingleMaster(req, res, "examination-schedules");
};

module.exports.singleMasterGraduationDeadlines = function (req, res) {
    doSingleMaster(req, res, "graduation-deadlines");
};

module.exports.singleMasterPriorBachelors = function (req, res) {
    doSingleMaster(req, res, "prior-bachelors");
};

module.exports.singleMasterRegulations = function (req, res) {
    doSingleMaster(req, res, "regulations");
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

        if (!(forums instanceof Array)) {
            message = "API lookup error";
            forums = []
        } else {
            if (!forums.length) {
                message = "No forums found";
            }
        }

        var data = {
            title: "TUe Forums",
            pageHeader: {
                title: "Forum",
                strapline: "Welcome to TU/e Forums"
            },
            forums: forums,
            message: message,
            headerActive: "forum",
            userType: req.session.userType
        };

        if (req.user) {
            data.userName = req.user.lastName + " " + req.user.initials;
        }

        res.render('forum', data);
    });
};

module.exports.forumSearch = function (req, res) {
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

        if (!(forums instanceof Array)) {
            message = "API lookup error";
            forums = []
        } else {
            if (!forums.length) {
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
            headerActive: "forum",
            userType: req.session.userType
        };

        if (req.user) {
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

        if (err) {
            message = "API lookup error";
            forum = null;
        } else {
            if (!forum.length) {
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
            headerActive: "forum",
            userType: req.session.userType
        });
    });
};

module.exports.doAddPost = function (req, res) {
    var requestOptions, path, postdata;

    path = '/api/forum/' + req.params.forumid + '/add-new-post';

    postdata = {
        author: req.user.lastName + " " + req.user.initials,
        title: req.body.title,
        description: req.body.description
    };

    if (req.user) {
        postdata.user = req.user;
    }

    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };

    if (!postdata.title || !postdata.description) {
        res.redirect('/forum/' + req.params.forumid + '/add-new-post?err=val');
    } else {
        request(requestOptions, function (err, response, body) {
            if (response.statusCode === 201) {
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

        if (err) {
            message = "API lookup error";
            forum = null;
        } else if (!forum.length) {
            message = "No forums found";
        }

        var loggedIn = !!req.user;
        if (response.statusCode === 200) {
            res.render('subforum', {
                title: forum.title,
                pageHeader: {
                    title: forum.title,
                    strapline: "Welcome to " + forum.title
                },
                forum: forum,
                message: message,
                userType: req.session.userType,
                headerActive: "forum",
                loggedIn: loggedIn
            });
        } else {
            _showError(req, res, response.statusCode);
        }
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

        if (response.statusCode === 200) {
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
                headerActive: "forum",
                loggedIn: loggedIn
            };

            if (req.user) {
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

    if (req.body._method === "DELETE") { // DELETE
        postdata = {
            answerId: req.body.answerId
        };

        if (req.user) {
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
            if (response.statusCode === 204) {
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

        if (req.user) {
            postdata.user = req.user;
        } else {
            _showError(req, res, 401);
        }

        requestOptions = {
            url: apiOptions.server + path,
            method: "POST",
            json: postdata
        };

        if (!postdata.answerBody) {
            res.redirect('/forum/' + req.params.forumid + '/' + req.params.postid + '?err=val');
        } else {
            request(requestOptions, function (err, response, body) {
                if (response.statusCode === 201) {
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
    res.render('organization', {
        pageHeader: {
            title: "Advisors & Tutors",
            strapline: "These are the Advisors and Tutors of TU/e"
        },
        content: '<h2 class="basic-title align-left">Different coaches</h2> <p class="basic-text">As a student the TU/e Bachelor College gives you a lot of space to create your own study based on personal interest and ambitions. A coach will help you with making these choices.</p> <h3 class="small-title">Coach</h2> <p class="basic-text">During this  decision process you will receive coaching from a lecturer from your major. Your study coach will talk with you to reflect on expectations, prospects, successes and difficulties, and help you to find the optimum match between your ambitions and your specific degree program. The final responsibility for your decisions rests with you, but your coach is there to help you.</p> <h3 class="small-title">Student Mentor</h3> <p class="basic-text">Besides the study coach, you also be assigned a student mentor, who you will see mostly during the first semester (quartile 1 and quartile 2). He or she will help you with the practical matters that you have to deal with relating to your study. For example, where you should be to buy books, what is the best way to study and how to find your way around the student life.</p> <h2 class="basic-title align-left">Coaching process</h2> <p class="basic-text">Every choice you make has consequences for your academic career. So we advise you to carefully consider your choices beforehand. Check that the expectation you have of the elective/package you are considering is realistic. To do this you need to look beyond the information to be found on the website, in the course guide etc. Depending on the specific information you are looking for, you should talk to an academic advisor or a lecturer in the relevant elective, for example. The Check your Match event is intended to give you the opportunity for this kind of in-depth conversation.</p><h3 class="small-title">Step 1</h3> <p class="basic-text">Consult online resources that have information about electives and USE learning trajectories. Thoroughly explore the information available and take the time to consider why certain electives do or do not appeal to you. Ask yourself the following questions for example:</p> <ul class="basic-text"> <li>What are my ambitions after my Bachelor/ Master?</li><li>Which courses did I find interesting the past year? And which not?</li><li>What would I like to see more of in my future TU/e career?</li><li>Do I need other challenges besides the one I already got? If so, would I like to participate in an Honors program?</li><li>Do I feel like I\' ve chosen the right major? If not, what should I do to fix this?</li></ul> <p class="basic-text">Using the information available, draw up a Top 3 list of elective courses, a top 2 of USE trajectories and if you would like to participate in a Honor. Sign up for in-depth conversations during the Check your Match event.</p><h3 class="small-title">Step 2</h3> <p class="basic-text">Prepare for the in-depth conversation; think about what information you still need and what questions you should ask to help you find this information.</p><p class="basic-text">Below are some ideas for questions you may find useful to ask:</p><ul class="basic-text"> <li>Does the packages have need prior knowledge? Do I have this?</li><li>Which specific topics are covered in this course?</li><li>Which actors play a role in this course (for example, contact with the business community)?</li><li>Which professional skills do I need for this course?</li><li>Which interests are drawn on in this course?</li><li>Which research or literature is key to this course?</li><li>Which working and assessment methods are used?</li></ul> <h3 class="small-title">Step 3</h3> <p class="basic-text">Discuss your choices for Check your Match with your coach. On which decisions is your top 3 electives, top 2 USE trajectories and participation in a Honor based?</p><ul class="basic-text"> <li>Do you need further information to make my final decision?</li><li>Which questions would I like to ask the teachers to receive that specific information?</li><li>Do I have all the requested prior knowledge? And if not, what should I do to have this? Or will I make different choices instead?</li></ul> <h3 class="small-title">Step 4</h3> <p class="basic-text">Participate in the <a href="https://educationguide.tue.nl/programs/bachelor-college/coaching/check-your-match/">Check your Match</a> event and ask all the questions your prepared.</p><h3 class="small-title">Step 5</h3> <p class="basic-text">Evaluate the information you received during the Check your Match event. Based on this you should be able to make a decision on your electives, USE- trajectory and participation in a Honor. Discuss your choices with your coach and make your final choice. Helpful questions are:</p><ul class="basic-text"> <li>How do I feel about the past year?</li><li>What aspects am I satisfied with?</li><li>What would I like to do differently in the coming years? </li><li>How do I feel about the decision-making process for the electives? What did I find easy/difficult? What will I be paying special attention to in the future?</li><li>Which electives/packages or USE learning trajectory have I chosen? And why? What goal will this choice help me achieve?</li><li>Which electives do I feel confident/unsure about?</li><li>If this educational career was my CV, what would make me stand out from other students?</li><li>What would I like the coaching in the second year to focus on?</li></ul> <h3 class="small-title">Step 6</h3> <p class="basic-text">Submit your electives via the online form.</p>' ,
        headerActive: "organization",
        accordionOrganizationActive: "advisors-tutors",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};

module.exports.rulesRegulations = function (req, res) {
    res.render('organization', {
        pageHeader: {
            title: "Rules & Regulations",
            strapline: "These are the Rules and Regulations of TU/e"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        headerActive: "organization",
        accordionOrganizationActive: "rules-regulations",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};

module.exports.campusCard = function (req, res) {
    res.render('organization', {
        pageHeader: {
            title: "Campus Card",
            strapline: "Campus Card of TU/e"
        },
        content:'<p class="basic-text">Once you have completed your enrollment at Eindhoven University of Technology, you will receive a campus card. Your campus card is valid for your entire study period. This means that you will receive a (plastic) campus card only once. Alongside the campus card you will be issued with a laminated proof of enrollment. The proof of enrollment is issued each academic year.</p><h2 class="basic-title align-left">Access</h2> <p class="basic-text">Your campus card gives you access to: </p><ul class="basic-text"> <li>TU/e sports Centre</li><li>Lectures</li><li>The library</li><li>Copy machinese</li><li>The lockers in the MetaForum and Auditorium.</li></ul> <p class="basic-text">You must also show your campus card when you attend exams.</p><h2 class="basic-title align-left">Loss or theft</h2> <p class="basic-text">In case of loss or damage of the campus card, a new card can be made at the Parking & Security Desk for € 30, -. In case of theft a new card will be made for free, provided that a declaration of theft is shown. If the card has been damaged during normal use, the new card will be handed out for free. The employee will decide when the card is shown. To apply for a new card, please send an email to <a href="mailto:parking@tue.nl">parking@tue.nl</a>.</p>'
      ,
        headerActive: "organization",
        accordionOrganizationActive: "campus-card",
        sideboxes: [{
            title: "Changes to your details",
            body: '<p class="basic-text">If any of your personal or study details change you should contact the STU, which will issue you with a new plastic proof of enrollment.</p>'
        }],
        userType: req.session.userType
    });
};

// STUDY
module.exports.notebook = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Notebook",
            strapline: "TU/e Notebook"
        },
        content:  '<h2 class="basic-title align-left">Service</h2><p class="basic-text">The basic assumption is that students will receive a properly functioning notebook (exceptions aside) at their disposal for four years. Maintenance and insurance will support this.</p><p class="basic-text">Should you, however, handle the notebook improperly, <a href="https://intranet.tue.nl/en/university/services/ict-services/ict-services-students/insurance-conditions-notebook/">maintenance and insurance agreements</a> may expire.</p><h2 class="basic-title align-left">Warranty and maintenance</h2><ul class="basic-text"><li>In accordance with the notebook regulation, anyone who buys a notebook is entitled to four year’s maintenance and warranty.</li><li>If something goes wrong with the notebook, a distinction is made between software and hardware problems.</li><li>ICT Services Student will take care of the software. The costs involved will be paid by the TU/e.</li><li>Hardware maintenance will be contracted out to a repair centre.</li></ul><p class="basic-text">If your problem is repaired under warranty, you, as a student, will face no costs as a result of this. If damage is repaired under insurance, a deductible amount may be involved. If damage is covered by neither warranty nor insurance, the student will bear all costs.</p><p class="basic-text">In order to keep maintenance costs at a minimum, the notebooks returned by students who terminate their course in the fourth year of the maintenance period, will be used for parts.</p><h2 class="basic-title align-left">Course termination</h2><p class="basic-text">Should you decide to terminate your course of studies, it can mean two things: Either you cease your course or you have graduated. If you decide not to choose a main enrollment, but an secondary enrollment, or you decide to (temporarily) interrupt your course, that will also be regarded as course cessation. More information about what happens with your TU/e notebook in the case of course cessation can be found in one of the boxes on the side.</p><h2 class="basic-title align-left">Graduated</h2><p class="basic-text">Once you have graduated, the obligation becomes null and void, and the rest of total “loan due” will be demanded at once. After that, your machine has been totally paid for. However, it is not possible at this stage to sell the notebook back to the TU/e.</p><p class="basic-text">The rule stating that after course cessation, the ICT Services Student will remove the IT facilities from the notebook, applies here too. However, you are allowed to keep your operating software.</p><p class="basic-text">Make sure that you hand in your notebook to have the software deleted at the ICT Services Student within five working days after your deregistration. If you fail to do this within the stipulated time, you will incur administration costs of € 50 for every month that you hand in your notebook/software after the stipulated time period.</p><h2 class="basic-title align-left">End of right ICT facilities</h2><p class="basic-text">If you are no longer a student, you also no longer have the right to the IT facilities (internet and e-mail access and the use of software). Therefore, these will be removed from the notebook. After the termination of your course, the ICT Services Student will see to this.</p><p class="basic-text">The TU/e is obliged to remove these facilities, due to the stipulations in the contract between the TU/e and Surf (higher education co-operation organization) and other software suppliers. The contract states that these facilities are provided exclusively to TU/e employees and TU/e students.</p><p class="basic-text">In both cases, make sure that you hand in your notebook to have the software deleted at the NSC within five working days after your deregistration. If you fail to do this within the stipulated time, you will incur administration costs of € 50 for every month that you hand in your notebook/software after the stipulated time period.</p>',
        headerActive: "study",
        accordionStudyActive: "notebook",
        sideboxes: [{
            title: "Course cessation",
            body: '<p class="basic-text">If you decide to terminate your course prematurely, there are two possibilities:</p>' +
            '<ul class="basic-text">' +
                '<li>You sell your notebook back to the TU/e and will receive the purchase amount pro rata (a condition is that it is a main enrollment that is ended)</li>' +
                '<li>You keep the notebook and settle your obligation pro rata</li>' +
            '</ul>'
        }],
        userType: req.session.userType
    });
};

module.exports.freeSoftware = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Free Software",
            strapline: "Free Software at the TU/e"
        },
        content: '<p class="basic-text">If you bought a TU/e laptop, your Windows system will be preconfigured with basic software packages that everyone needs. You can <a href="https://www.win.tue.nl/bcf/windows/software/install.php">install extra software</a> yourself if you need to.</p><p class="basic-text">In most cases, you can find and install extra software for your Windows system from <a href="https://intranet.tue.nl/universiteit/diensten/ict-services/hulp-en-ondersteuning/software-tue-werkplek/">the "dienst ICT" software installation page</a>, Your system needs to be on the TU/e network to be able to install.</p><p class="basic-text">A <a href="https://intranet.tue.nl/universiteit/diensten/ict-services/hulp-en-ondersteuning/software-prive-systeem/">smaller collection of software</a> is available for installation on your home computer, but you need to be on the TU/e network to find the pointers and the license information for some of them.</p><p class="basic-text">If the software has a license for a single machine, you can request the license at the <a href="https://www.win.tue.nl/bcf/contact.php">Helpdesk BCF</a>.</p><p class="basic-text">If you\'re installing the software on your home computer and there is a license for home use, you can use a <a href="http://www.tue.nl/itsupport">VPN connection</a> to register your system on the TU/e network and then you can install the software from software installation page linked above.</p><p class="basic-text">If you cannot use a VPN connection, or if there is no license for home use of the software, there is a possibility to order software from <a href="">surfspot.nl</a>.</p>',
        headerActive: "study",
        accordionStudyActive: "free-software",
        sideboxes: [{
            title: "Instructions for registering licenses.",
            body: '<p class="basic-text">For some of the above mentioned pre-installed software the license can expire. In order to extend or reinstate licenses, more info can be found on the software pages:</p>' +
            '<ul class="basic-text">' +
                '<li>for <a href="https://intranet.tue.nl/en/university/services/ict-services/help-and-support/software-tue-device/">devices provided by TU/e</a></li>' +
                '<li>for <a href="https://intranet.tue.nl/en/university/services/ict-services/help-and-support/software-private-computers/">private computers</a></li>' +
            '</ul>'
        }],
        userType: req.session.userType
    });
};

module.exports.academicYear = function (req, res) {
    res.render('study', {
        pageHeader: {
            title: "Academic Year",
            strapline: "Academic Year at the TU/e"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        headerActive: "study",
        accordionStudyActive: "academic-year",
        sideboxes: [{
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }],
        userType: req.session.userType
    });
};

// USER
module.exports.register = function (req, res) {
    var data;

    console.log(req.flash('message'));

    data = {
        errorMessage: req.flash('message')
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


    if ((true)) { // !postdata.lastName || (postdata.username.match(usernameRegEx) === null) || !postdata.password || !postdata.initials
        req.flash('message', 'Invalid Input');

    } else {
        request(requestOptions, function (err, response, body) {
            if (response.statusCode === 201) {
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
