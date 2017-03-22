var express = require('express');
var router = express.Router();

var studentCtrl = require('../controllers/student');
var visitorCtrl = require('../controllers/visitor');
var uniformCtrl = require('../controllers/uniform');

var chooseUponUser = function (req, res, callback1, callback2) {
    if(req.session.userType === undefined) {
        req.session.userType = 'student';
        console.log(req.session.userType);
        // res.redirect(req.get('referrer'));
        // console.log(req.get('origin'));
        res.redirect('/'); // TODO: check this out
    } else if(req.session.userType === 'student') {
        callback1(req, res);
    } else {
        callback2(req, res);
    }
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
        chooseUponUser(req, res, studentCtrl.singleBachelor, visitorCtrl.singleBachelor);
    });

    router.get('/faculties/:facultyid/premaster/:premasterid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singlePremaster, visitorCtrl.singlePremaster);
    });

    router.get('/faculties/:facultyid/master/:masterid', function (req, res) {
        chooseUponUser(req, res, studentCtrl.singleMaster, visitorCtrl.singleMaster);
    });

    // ORGANIZATION
    router.get('/organization/map', uniformCtrl.map);

    router.get('/organization/contact', uniformCtrl.contact);

    router.get('/organization/student-for-a-day', uniformCtrl.studentForADay);

    router.get('/organization/advisors-tutors', studentCtrl.advisorsTutors);

    router.get('/organization/rules-regulations', studentCtrl.rulesRegulations);

    router.get('/organization/campus-card', studentCtrl.campusCard);

    router.get('/organization/enrollment', visitorCtrl.enrollment);

    // STUDY
    router.get('/study/electives', uniformCtrl.electives);

    router.get('/study/notebook', uniformCtrl.notebook);

    router.get('/study/canvas', uniformCtrl.canvas);

    router.get('/study/timetables-timeslots', uniformCtrl.timetablesTimeslots);

    router.get('/study/planapp', uniformCtrl.planapp);

    router.get('/study/internationals', uniformCtrl.internationals);

    router.get('/study/free-software', studentCtrl.freeSoftware);

    router.get('/study/academic-year', studentCtrl.academicYear);

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
        failureRedirect: '/registration',
        failureFlash: true
    }));

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/forum',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
