var express = require('express');
var router = express.Router();

var studentCtrl = require('../controllers/student');
var visitorCtrl = require('../controllers/visitor');
var otherCtrl = require('../controllers/other');

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
router.get('/', function (req, res) {
    if (req.session.userType === undefined) {
        req.session.userType = 'student';
        res.redirect('/');
    } else if (req.session.userType === 'student') {
        studentCtrl.homepage(req, res);
    } else {
        visitorCtrl.homepage(req, res);
    }
});

router.get('/forum', function (req, res) {
    chooseUponUser(req, res, studentCtrl.forum, otherCtrl.notAvailable);
});

router.get('/forum/:forumid', function (req, res) {
    chooseUponUser(req, res, studentCtrl.getOneForum, otherCtrl.notAvailable);
});

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

router.get('/faculties/:facultyidentification/bachelor/:bacheloridentification', function (req, res) {
    chooseUponUser(req, res, studentCtrl.singleBachelor, visitorCtrl.singleBachelor);
});

router.get('/faculties/:facultyidentification/premaster/:premasteridentification', function (req, res) {
    chooseUponUser(req, res, studentCtrl.singlePremaster, visitorCtrl.singlePremaster);
});

router.get('/faculties/:facultyidentification/master/:masteridentification', function (req, res) {
    chooseUponUser(req, res, studentCtrl.singleMaster, visitorCtrl.singleMaster);
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

module.exports = router;
