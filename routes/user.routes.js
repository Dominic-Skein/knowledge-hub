var express = require('express');
const userController = require('../controller/user.controller');
const FileUpload = require('../utils/file');
const passport = require('passport')

// router instance
var router = express.Router();

var UserController=require('../controller/user.controller')
//---------------------------------------Register-------------------------------------------------------------//
router.post('/register',FileUpload.base64ToImage("profile_picture","profile_picture"),UserController.CreateUser);

//----------------------------------------Login-------------------------------------------------------------//
router.post('/login',userController.LoginUser);

//-----------------------------------------UserUpdate--------------------------------------------------------//
router.put('/updateUser',FileUpload.base64ToImage("profile_picture","profile_picture"),UserController.updateUser);

//------------------------------------------GetUser----------------------------------------------------------//
router.get('/getuser',passport.authenticate('jwt',{session:false}),userController.getUser);

//------------------------------------------deleteUser------------------------------------------------------//
router.delete('/deleteuser',userController.deleteUser)

module.exports=router;