var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

/* POST home page */
// router.post('/', function (req, res) {
//     if(req.session.userType === undefined) {
//         req.session.userType = 'visitor';
//         res.redirect('/');
//     }
//
//     req.session.userType = req.session.userType === 'visitor' ? 'student' : 'visitor';
//     res.redirect('/');
// });

module.exports = router;
