var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');

/* GETs */
// FACULTIES
router.get('/faculties', mainCtrl.getFaculties);
router.get('/faculties/:facultyid', mainCtrl.getOneFaculty);
router.get('/faculties/:facultyid/bachelor/:bachelorid', mainCtrl.getOneBachelor);
router.get('/faculties/:facultyid/premaster/:premasterid', mainCtrl.getOnePremaster);
router.get('/faculties/:facultyid/master/:masterid', mainCtrl.getOneMaster);
// FORUM
router.get('/forum', mainCtrl.getForums);
router.get('/forum/:forumid', mainCtrl.getOneForum);
router.get('/forum/:forumid/:postid', mainCtrl.getOnePost);

/* POSTs */
//FORUM
router.post('/forum/:forumid/add-new-post', mainCtrl.createPost);
router.post('/forum/:forumid/:postid', mainCtrl.createAnswer);

module.exports = router;