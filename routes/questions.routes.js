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

 //---------------------------------------get all feed-------------------------------------------------------//
 router.get('/getallquestion',passport.authenticate('jwt',{session:false}),QuestionsController.getAllQuestion)

 //--------------------------------------Delete Feed--------------------------------------------------------//
 router.delete('/deletequestion',passport.authenticate('jwt',{session:false}),QuestionsController.deleteQuestion)

 //---------------------------------------question like add-----------------------------------------------------//
 router.post('/addquestionlike',passport.authenticate('jwt',{session:false}),QuestionsController.addQuestionLike)

 //---------------------------------------question like add-----------------------------------------------------//
 router.delete('/deletequestionlike',passport.authenticate('jwt',{session:false}),QuestionsController.deleteQuestionLike)


module.exports = router;