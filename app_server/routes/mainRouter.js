var express = require('express');
var router = express.Router();

var studentCtrl = require('../controllers/student');
var visitorCtrl = require('../controllers/visitor');
var uniformCtrl = require('../controllers/uniform');

var chooseUponUser = function (req, res, callback1, callback2) {
    if(req.session.userType === undefined) {
        req.session.userType = 'student';
        console.log(req.session.userType);
        res.redirect(req.get('referer'));
        // res.redirect('/');
    } else if(req.session.userType === 'student') {
        callback1(req, res);
    } else {
        callback2(req, res);
    }
};

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

// FACULTIES
router.get('/faculties', function (req, res) {
    chooseUponUser(req, res, studentCtrl.faculties, visitorCtrl.faculties);
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

router.get('/faculties/:facultyid/bachelor/:bachelorid', function (req, res) { // TODO: fix so that it receives a custom id
    chooseUponUser(req, res, studentCtrl.singleBachelor, visitorCtrl.singleBachelor);
});

router.get('/faculties/:facultyid/premaster/:premasterid', function (req, res) { // TODO: fix so that it receives a custom id
    chooseUponUser(req, res, studentCtrl.singlePremaster, visitorCtrl.singlePremaster);
});

router.get('/faculties/:facultyid/master/:masterid', function (req, res) { // TODO: fix so that it receives a custom id
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

/* POSTs */
router.post('/', function (req, res) {
    if (req.session.userType === undefined) {
        req.session.userType = 'student';
        res.redirect('/');
    }

    req.session.userType = req.session.userType === 'visitor' ? 'student' : 'visitor';
    res.redirect('/');
});

module.exports = router;
