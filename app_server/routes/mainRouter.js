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
