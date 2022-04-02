var express = require('express');
const commentsController = require('../controller/comments.controller');
const FileUpload = require('../utils/file');
const passport = require('passport');
const FeedsModel = require('../models/feeds.Model');

// router instance
var router = express.Router();

//---------------------------------------Add Comments-------------------------------------------------------------//
router.post('/addcomments',passport.authenticate('jwt',{session:false}),commentsController.addComments);

//----------------------------------------get Comments-----------------------------------------------------------//
router.get('/getcomment',passport.authenticate('jwt',{session:false}),commentsController.getcomment)

//---------------------------------------delete comments----------------------------------------------------------//
router.delete('/deletecomments',passport.authenticate('jwt',{session:false}),commentsController.deleteComment);

//----------------------------------------update comments---------------------------------------------------------//
router.put('/updatecomment',passport.authenticate('jwt',{session:false}),commentsController.updateComments)

//---------------------------------------Add Answer-------------------------------------------------------------//
router.post('/addanswer',passport.authenticate('jwt',{session:false}),commentsController.addAnswer);

//----------------------------------------get Answer-----------------------------------------------------------//
router.get('/getanswer',passport.authenticate('jwt',{session:false}),commentsController.getAnswer)

//---------------------------------------delete comments----------------------------------------------------------//
router.delete('/deleteanswer',passport.authenticate('jwt',{session:false}),commentsController.deleteAnswer);

//----------------------------------------update comments---------------------------------------------------------//
router.put('/updateanswer',passport.authenticate('jwt',{session:false}),commentsController.updateAnswer)


module.exports = router;
