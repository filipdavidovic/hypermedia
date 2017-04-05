var express = require('express');
var router = express.Router();

var studentCtrl = require('../controllers/student');
var visitorCtrl = require('../controllers/visitor');
var uniformCtrl = require('../controllers/uniform');

var chooseUponUser = function (req, res, callback1, callback2) {
    if (req.session.userType === undefined) {
        req.session.userType = 'student';
        console.log(req.session.userType);
        // res.redirect(req.get('referrer'));
        // console.log(req.get('origin'));
        res.redirect('/'); // TODO: check this out
    } else if (req.session.userType === 'student') {
        callback1(req, res);
    } else {
        callback2(req, res);
    }
};

var checkUser = function (req, res, callback) {
    if(req.session.userType === undefined || req.session.userType === 'visitor') {
        req.session.userType = 'student';
    }
    callback(req, res);
};

var checkVisitor = function (req, res, callback) {
    if(req.session.userType === undefined || req.session.userType === 'student') {
        req.session.userType = 'visitor';
    }
    callback(req, res);
};

module.exports = function (passport) {
    /* GETs */
    // HOMEPAGE
    router.get('/', function (req, res) { // TODO: decide whether separate controllers are needed for homepage
        if (req.session.userType === undefined) {
            req.session.userType = 'student';
            res.redirect('/');
        } else if (req.session.userType === 'student') {
            studentCtrl.homepage(req, res);
        } else {
            visitorCtrl.homepage(req, res);
        }
    });

    // FORUM
    router.get('/forum', function (req, res) {
        chooseUponUser(req, res, studentCtrl.forum, uniformCtrl.notAvailable);
    });

    router.get('/forum/search', function (req, res) {
        chooseUponUser(req, res, studentCtrl.forumSearch, uniformCtrl.notAvailable);
    });

    router.get('/forum/:forumid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.getOneForum, uniformCtrl.notAvailable);
    });

    router.get('/forum/:forumid/add-new-post', function (req, res) {
        chooseUponUser(req, res, studentCtrl.addPost, uniformCtrl.notAvailable);
    });

    router.get('/forum/:forumid/:postid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.getOnePost, uniformCtrl.notAvailable);
    });

    // FACULTIES
    router.get('/faculties', function (req, res) {
        chooseUponUser(req, res, studentCtrl.faculties, visitorCtrl.faculties);
    });

    router.get('/faculties/:facultyid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singleFaculty, visitorCtrl.singleFaculty);
    });

    router.get('/faculties/bachelor', function (req, res) {
        chooseUponUser(req, res, studentCtrl.bachelor, visitorCtrl.bachelor);
    });

    router.get('/faculties/premaster', function (req, res) {
        chooseUponUser(req, res, studentCtrl.premaster, visitorCtrl.premaster);
    });

    router.get('/faculties/master', function (req, res) {
        chooseUponUser(req, res, studentCtrl.master, visitorCtrl.master);
    });

    router.get('/faculties/:facultyid/bachelor/:bachelorid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singleBachelorGeneralInfo, visitorCtrl.singleBachelor); // singleBachelorGeneralInfo
    });

    router.get('/faculties/:facultyid/bachelor/:bachelorid/professional-development', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singleBachelorProfessionalDevelopment, visitorCtrl.singleBachelor); // singleBachelorGeneralInfo
    });

    router.get('/faculties/:facultyid/bachelor/:bachelorid/examination-schedules', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singleBachelorExaminationSchedules, visitorCtrl.singleBachelor); // singleBachelorGeneralInfo
    });

    router.get('/faculties/:facultyid/bachelor/:bachelorid/graduation-deadlines', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singleBachelorGraduationDeadlines, visitorCtrl.singleBachelor); // singleBachelorGeneralInfo
    });

    router.get('/faculties/:facultyid/premaster/:premasterid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singlePremaster, visitorCtrl.singlePremaster);
    });

    router.get('/faculties/:facultyid/master/:masterid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singleMaster, visitorCtrl.singleMaster);
    });

    // ORGANIZATION
    router.get('/organization/map', function(req, res) {
        checkUser(req, res, uniformCtrl.map);
    });

    router.get('/organization/contact', function(req, res) {
        checkUser(req, res, uniformCtrl.contact)
    });

    router.get('/organization/student-for-a-day', function(req, res) {
        checkUser(req, res, uniformCtrl.studentForADay)
    });

    router.get('/organization/advisors-tutors', function(req, res) {
        checkUser(req, res, studentCtrl.advisorsTutors);
    });

    router.get('/organization/rules-regulations', function(req, res) {
        checkUser(req, res, studentCtrl.rulesRegulations);
    });

    router.get('/organization/campus-card', function(req, res) {
        checkUser(req, res, studentCtrl.campusCard);
    });

    router.get('/organization/enrollment', function(req, res) {
        checkVisitor(req, res, visitorCtrl.enrollment);
    });

    // STUDY
    router.get('/study/electives', function(req, res) {
        checkUser(req, res, uniformCtrl.electives);
    });

    router.get('/study/notebook', function(req, res) {
        chooseUponUser(req, res, studentCtrl.notebook, visitorCtrl.notebook);
    });

    router.get('/study/canvas', function(req, res) {
        checkUser(req, res, uniformCtrl.canvas);
    });

    router.get('/study/timetables-timeslots', function(req, res) {
        checkUser(req, res, uniformCtrl.timetablesTimeslots);
    });

    router.get('/study/planapp', function(req, res) {
        checkUser(req, res, uniformCtrl.planapp);
    });

    router.get('/study/internationals', function(req, res) {
        checkUser(req, res, uniformCtrl.internationals);
    });

    router.get('/study/free-software', function(req, res) {
        checkUser(req, res, studentCtrl.freeSoftware);
    });

    router.get('/study/academic-year', function(req, res) {
        checkUser(req, res, studentCtrl.academicYear);
    });

    // USER
    router.get('/register', function (req, res) {
        chooseUponUser(req, res, studentCtrl.register, uniformCtrl.notAvailable);
    });

    router.get('/login', function (req, res) {
        chooseUponUser(req, res, studentCtrl.login, uniformCtrl.notAvailable);
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/forum');
    });

    /* POSTs */
    router.post('/', function (req, res) {
        if (req.session.userType === undefined) {
            req.session.userType = 'student';
            res.redirect('/');
        }

        req.session.userType = req.session.userType === 'visitor' ? 'student' : 'visitor';
        res.redirect('/');
    });

    router.post('/forum/:forumid/add-new-post', function (req, res) {
        chooseUponUser(req, res, studentCtrl.doAddPost, uniformCtrl.notAvailable);
    });

    router.post('/forum/:forumid/:postid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.doChangeAnswer, uniformCtrl.notAvailable);
    });

    router.post('/register', passport.authenticate('registration', {
        successRedirect: '/forum',
        failureRedirect: '/register',
        failureFlash: true
    }));

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/forum',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
