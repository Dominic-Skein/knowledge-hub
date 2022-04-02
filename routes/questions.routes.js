var express = require('express');
const QuestionsController = require('../controller/questions.controller');
const FileUpload = require('../utils/file');
const passport = require('passport')

var router = express.Router();

//----------------------Add Questions----------------------------//
router.post('/addquestion',passport.authenticate('jwt',{session:false}),FileUpload.base64ToImage("question_image","question_image"),QuestionsController.addQuestion);

//---------------------Update Questions--------------------------//
router.put('/updatequestion',passport.authenticate('jwt',{session:false}),FileUpload.base64ToImage("question_image","question_image"),QuestionsController.updateQuestion)

//----------------------get Question-----------------------------//
router.get('/getquestion',passport.authenticate('jwt',{session:false}),QuestionsController.getQuestion)

 //--------------------------------------Delete Fedd--------------------------------------------------------//
 router.delete('/deletequestion',passport.authenticate('jwt',{session:false}),QuestionsController.deleteQuestion)


module.exports = router;