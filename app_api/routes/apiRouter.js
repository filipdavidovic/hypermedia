var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');

/* GETs */
router.get('/forum', mainCtrl.getForums);
router.get('/forum/:forumid', mainCtrl.getOneForum);
router.get('/forum/:forumid/:postid', mainCtrl.getOnePost);

module.exports = router;