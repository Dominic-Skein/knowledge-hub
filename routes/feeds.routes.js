 var express = require('express');
 const feedController = require('../controller/feeds.controller');
 const FileUpload = require('../utils/file');
 const passport = require('passport');
const FeedsModel = require('../models/feeds.Model');

 // router instance
 var router = express.Router();

 //---------------------------------------Add Feed-------------------------------------------------------------//
 router.post('/addfeed',passport.authenticate('jwt',{session:false}),FileUpload.base64ToImage("feed_image","feed_image"),feedController.addFeed);

 //--------------------------------------fetch feed-----------------------------------------------------------//
 router.get('/getfeed',passport.authenticate('jwt',{session:false}),feedController.gedFeed);

 //---------------------------------------get all feed-------------------------------------------------------//
 router.get('/getallfeed',passport.authenticate('jwt',{session:false}),feedController.getAllfeed)

 //--------------------------------------updated feed--------------------------------------------------------//
 router.put('/updatefeed',passport.authenticate('jwt',{session:false}),FileUpload.base64ToImage("feed_image","feed_image"),feedController.updateFeed);

 //--------------------------------------Delete Fedd--------------------------------------------------------//
 router.delete('/deletefeed',passport.authenticate('jwt',{session:false}),feedController.deleteFeed)

 module.exports = router;
