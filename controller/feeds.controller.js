const { StatusCodes } = require("http-status-codes")
const { message } = require("statuses")
const FeedsModel = require("../models/feeds.Model")
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages");
const Response = require("../utils/response");
const moment = require('moment');
const e = require("express");

const feedController={
async addFeed(req,res){
    try{
    let {feed_summary,feed_image,interests,user_id,feed_views} = req.body

    let addFeed = await FeedsModel.AddFeed(req.body);
    if(addFeed[0].affectedRows){
        new Response(res)._SuccessResponseWithoutData("Feed Create Successfully...");
    }
    else{
        new Response(res)._ErrorMessage("Feed was Not created.....")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }

},

async gedFeed(req,res){
    try{
    let { feed_id,interests,page_no } = req.query;
    console.log(feed_id);
    const user_id = req.user.user_id
    
    let [getFeed] = await FeedsModel.GetFeed({ feed_id,interests,user_id});
    var get_Fed = [];
        let data;
    getFeed.map((feed)=>{
        
        let feed_intrests = feed.interests.slice(1, -1)
        let feed_int = feed_intrests.split(","); 
        let get_int = interests.split(",");
        var num = 0;
        feed_int.filter((i)=>{
            get_int.filter((j)=>{
                if(i===j){
                    data = feed    
                    get_Fed.push(data);
                return get_Fed
                }
            })
              
        }
        
        )

    })

    if(page_no){
        if(get_Fed.length){
            var n = page_no * 10
            var m = n+10
            if(get_Fed.length <= m){
                m=get_Fed.length
            }
            var array = []
            for(i=n; i<m; i++){
                array.push(get_Fed[i])
            }
            get_Fed = array
        }
    }


    if(get_Fed.length){
        new Response(res)._SuccessResponseWithData("Feed was fetched successfully....!",get_Fed)
    }
    else{
        new Response(res)._ErrorMessage("Feed was Fetched Failed...!")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
},

async getAllfeed(req,res){
    try{
    let getallfeeds = await FeedsModel.getAllfeed();
    if(getallfeeds[0].length){
        new Response(res)._SuccessResponseWithData("All Feed was fetched successfully....!",getallfeeds[0])
    }
    else{
        new Response(res)._ErrorMessage("Feed was Fetched Failed...!")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
},

async updateFeed(req,res){
    try{
    let {feed_id} = req.query;
    let { feed_summary,feed_image,interests,user_id } = req.body;
    let feedData = {
        "feed_id":feed_id,
        "feed_summary":feed_summary,
        "feed_image":feed_image,
        "interests":interests,
        "user_id":user_id
    }
    let [updateFeed] = await FeedsModel.UpateFeed(feedData);
    if(updateFeed.affectedRows){
        new Response(res)._SuccessResponseWithoutData("Feed updated Successfully...!")
    }
    else{
        new Response(res)._ErrorMessage("Feed updated was Failed...!")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
},
async deleteFeed(req,res){
    try{
    let {feed_id}=req.query;
    let feeddelete = await FeedsModel.DeleteFeed(feed_id);
    if(feeddelete[0].affectedRows){
        new Response(res)._SuccessResponseWithoutData("Feed was Deleted Successfully....!",)
    }
    else{
        new Response(res)._ErrorMessage("Feed Was Not Deleted.....!")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }

},
async addFeedLike(req,res){
    try{
        let { user_id,feed_id,click_user_id }= req.body
        let add_Feed_Like = await FeedsModel.AddFeedLike(req.body); 
        if(add_Feed_Like[0].affectedRows){
            new Response(res)._SuccessResponseWithoutData("Feed Like Added Successfully...");
        }
        else{
            new Response(res)._ErrorMessage("Feed Like was Not created.....")
        }
    }
    catch(err){
          /**
         * Handling err response
         */
           new SpErrorHandler(res, err) 
    }
},
async deleteFeedLike(req,res){
try{
    let {user_id,feed_id} = req.query;
    
    let feedlikedelete = await FeedsModel.DeleteFeedLike(req.query);
    if(feedlikedelete[0].affectedRows){
        new Response(res)._SuccessResponseWithoutData("Feed like was Deleted Successfully....!",)
    }
    else{
        new Response(res)._ErrorMessage("Feed like Was Not Deleted.....!")
    }
}    
catch(err){
     /**
         * Handling err response
         */
      new SpErrorHandler(res, err) 
}
},
async getFeedLike(req,res){
    try{
    let { feed_id } = req.query
        let getFeed = await FeedsModel.GetFeedLike(feed_id)
        console.log(getFeed[0])
        if(getFeed[0].length){
            new Response(res)._SuccessResponseWithData("All Feed Likes was fetched successfully....!",getFeed[0])
        }
        else{
            new Response(res)._ErrorMessage("Feed Like was Fetched Failed...!")
        }
    }
    catch(err){
        new SpErrorHandler(res, err)
    }
}
}
module.exports=feedController;