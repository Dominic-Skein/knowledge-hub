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

module.exports = router;
