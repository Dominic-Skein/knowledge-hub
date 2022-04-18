var express = require('express');
const chatController = require('../controller/comments.controller');
const FileUpload = require('../utils/file');
const passport = require('passport');

//router instance
var router = express.Router();

//---------------------------------------Add Chat with image-------------------------------------------------------------//
router.post('/add-chat',passport.authenticate('jwt',{session:false}),FileUpload.base64ToImage("feed_image","feed_image"),chatController.addChats);

module.exports = router;