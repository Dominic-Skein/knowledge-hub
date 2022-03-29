 var express = require('express');
 const feedController = require('../controller/feeds.controller');
 const FileUpload = require('../utils/file');
 const passport = require('passport');
const FeedsModel = require('../models/feeds.Model');

 // router instance
 var router = express.Router();

 //---------------------------------------Add Feed-------------------------------------------------------------//
 router.post('/addfeed',FileUpload.base64ToImage("feed_image","feed_image"),feedController.addFeed);

 //--------------------------------------fetch feed-----------------------------------------------------------//
 router.get('/getfeed',feedController.gedFeed);

 //---------------------------------------get all feed-------------------------------------------------------//
 router.get('/getallfeed',feedController.getAllfeed)

 //--------------------------------------updated feed--------------------------------------------------------//
 router.put('/updatefeed',FileUpload.base64ToImage("feed_image","feed_image"),feedController.updateFeed);

 //--------------------------------------Delete Fedd--------------------------------------------------------//
 router.delete('/deletefeed',feedController.deleteFeed)

 module.exports = router;
