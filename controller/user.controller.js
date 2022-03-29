const { StatusCodes } = require("http-status-codes")
const { message } = require("statuses")
//const QueryGenerator = require("../generators/query.generator")
const UserModal = require("../models/user.Model")
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages");
const Response = require("../utils/response");
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const userController={
    async CreateUser(req,res){
        try{
            let{
                full_name,
                designation,
                work_experience,
                interests,
                email,
                mobile_no,
                profile_picture,
                fcm_token
            }=req.body;
            
            var UserData= {
                full_name,
                designation,
                work_experience,
                interests,
                email,
                mobile_no,
                profile_picture,
                fcm_token
            };
            var valid_mobile_no = {"mobile_no":mobile_no}
            let [get_valid_mobile_no] = await UserModal.GetUser(valid_mobile_no);
            
            
            if(get_valid_mobile_no.length){
                new Response(res)._ErrorMessage("Mobile number allready exist")
                console.log(get_valid_mobile_no);
                return;
            }

            if(UserData){
                let[User]=await UserModal.CreateUser(UserData)
            if(User.insertId){
                var insert_id = {"user_id":User.insertId}
                let getUser = await UserModal.GetUser(insert_id)
                let payload ={
                    "user_id":getUser[0][0].user_id,
                    "full_name":getUser[0][0].full_name,
                    "designation":getUser[0][0].designation,
                    "work_experience":getUser[0][0].work_experience,
                    "interestes":getUser[0][0].interestes,
                    "email":getUser[0][0].email,
                    "mobile_no":getUser[0][0].mobile_no,
                    "fcm_token":getUser[0][0].fcm_token
                }
                let options = { expiresIn: process.env.JWT_EXPIRE_TIME, issuer : process.env.JWT_ISSUER };
                let secret = process.env.JWT_SECRET;
                let token = jwt.sign(payload, secret, options)

                // create http only cookie with refresh token that expires in 10 mins
                const cookieOptions = {
                    httpOnly: true,
                    expires: new Date(moment().add(31, 'days')),
                    overwrite: true
                };

                res.cookie('x-access-token', token, cookieOptions);
                console.log("---------------->",token)
                new Response(res)._SuccessResponse("Register Successfull...!", payload, token)
               
            }
            else{
                new Response(
                    res,
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.UserRegister.FailureMessage.Create
                )
            }

        }
        }
        catch(err){
            /**
             * Handling err response
             */
             new SpErrorHandler(res, err)    
        }
    },

    async LoginUser(req,res){
    try{
        let{
            mobile_no,
        }=req.body;

        if(mobile_no.length){
        var UserData = await UserModal.LoginUser({mobile_no})
        //console.log("--------------->",UserData[0].length)
        if(UserData[0].length){
            let payload ={
                "user_id":UserData[0][0].user_id,
                "full_name":UserData[0][0].full_name,
                "designation":UserData[0][0].designation,
                "work_experience":UserData[0][0].work_experience,
                "interestes":UserData[0][0].interestes,
                "email":UserData[0][0].email,
                "mobile_no":UserData[0][0].mobile_no,
                "fcm_token":UserData[0][0].fcm_token
            }

            let options = { expiresIn: process.env.JWT_EXPIRE_TIME, issuer : process.env.JWT_ISSUER };
                let secret = process.env.JWT_SECRET;
                let token = jwt.sign(payload, secret, options)

                // create http only cookie with refresh token that expires in 10 mins
                const cookieOptions = {
                    httpOnly: true,
                    expires: new Date(moment().add(31, 'days')),
                    overwrite: true
                };

                res.cookie('x-access-token', token, cookieOptions);

                new Response(res)._LoginResponse(payload, token)
            }
            else{
                new Response(
                    res,
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.UserLogin.FailureMessage.Create
                    )
            }
        }   
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
    },

    async updateUser(req,res){
        try{
        let{user_id} = req.query; 
        let{
            full_name,
            designation,
            work_experience,
            interests,
            email,
            mobile_no,
            profile_picture,
            fcm_token
        }=req.body;

        var UserData= {
            user_id,
            full_name,
            designation,
            work_experience,
            interests,
            email,
            mobile_no,
            profile_picture,
            fcm_token
        };

        if(UserData){
            let[User]=await UserModal.updateUser(UserData)
            if(User.affectedRows){
                new Response(res)._SuccessResponseWithoutData("User updated Successfully...!")
            }
            else{
                new Response(
                    res,
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.userUpdate.FailureMessage.Create
                    )   
            }
        }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
    },
    async getUser(req,res){
        try{
        let {user_id} = req.query
        let data ={"user_id":user_id};
        let getinUser = await UserModal.GetUser(data);
        if(getinUser[0].length){
            new Response(res)._SuccessResponseWithData(Message.Getuser.SuccessMessage.fetch,getinUser[0])
        }
        else{
            new Response(
                res,
                StatusCodes.BAD_REQUEST
            )._ErrorMessage(
                Message.Getuser.FailureMessage.fetch
                )   
        }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
    },
    async deleteUser(req,res){
    try{
     let {user_id} = req.query;
     let deleteuser = await UserModal.deleteUser(user_id);
     
     if(deleteuser[0].affectedRows){
        new Response(res)._SuccessResponse(Message.UserDelete.SuccessMessage.Delete)
     }
     else{
         new Response(res)._ErrorMessage(Message.UserDelete.FailureMessage.Delete)
     }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }

    }
}

module.exports=userController;