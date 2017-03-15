var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');

/* GETs */
router.get('/faculties', mainCtrl.getFaculties);
router.get('/faculties/:facultyid', mainCtrl.getOneFaculty);
router.get('/faculties/:facultyid/bachelor/:bachelorid', mainCtrl.getOneBachelor);
router.get('/faculties/:facultyid/premaster/:premasterid', mainCtrl.getOnePremaster);
router.get('/faculties/:facultyid/master/:masterid', mainCtrl.getOneMaster);

/* might be redundant */
router.get('/forum', mainCtrl.getForums);
router.get('/forum/:forumid', mainCtrl.getOneForum);
router.get('/forum/:forumid/:postid', mainCtrl.getOnePost);

module.exports = router;