var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');

/* GETs */
router.get('/', function (req, res) {
    if (req.session.userType === undefined) {
        req.session.userType = 'student';
        res.redirect('/');
    } else if (req.session.userType === 'student') {
        mainCtrl.homepage(req, res);
    } else {
        mainCtrl.homepageVisitor(req, res);
    }
});

router.get('/forum', function (req, res) {
    if(req.session.userType === 'student') {
        mainCtrl.forum(req, res);
    } else {
        mainCtrl.notAvailable(req, res);
    }
});

router.get('forum/:forumid', function (req, res) {
    res.end("Success");
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
