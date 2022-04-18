var express = require('express');
const chatController = require('../controller/chat.controller');
const FileUpload = require('../utils/file');
const passport = require('passport');

//router instance
var router = express.Router();

//---------------------------------------Add Chat with image-------------------------------------------------------------//
router.post('/add-chat',passport.authenticate('jwt',{session:false}),FileUpload.base64ToImage("chat_image","chat_image"),chatController.addChat);

module.exports = router;