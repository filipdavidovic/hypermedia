var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');

/* GETs */
router.get('/', function (req, res) {
    if (req.session.userType === 'visitor' || req.session.userType === undefined) {
        mainCtrl.homepageVisitor(req, res);
    } else {
        mainCtrl.homepage(req, res);
    }
});

/* POSTs */
router.post('/', function (req, res) {
    if (req.session.userType === undefined) {
        req.session.userType = 'visitor';
        res.redirect('/');
    }

    req.session.userType = req.session.userType === 'visitor' ? 'student' : 'visitor';
    res.redirect('/');
});

module.exports = router;
