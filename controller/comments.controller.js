const { StatusCodes } = require("http-status-codes")
const { message } = require("statuses")
//const QueryGenerator = require("../generators/query.generator")
const commentsModal = require("../models/comments.Model")
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages");
const Response = require("../utils/response");


const commentsController={
async addComments(req,res){
    try{
        console.log("------------------->",req.body);
        let {user_id,feed_id,click_user_id,comment} = req.body
    
        let addComment = await commentsModal.AddComments(req.body);
        if(addComment[0].affectedRows){
            new Response(res)._SuccessResponseWithoutData("Feed comments Create Successfully...");
        }
        else{
            new Response(res)._ErrorMessage("Feed comments was Not created.....")
        }
        }
        catch(err){
            /**
             * Handling err response
             */
             new SpErrorHandler(res, err)    
        }
},

async getcomment(req,res){
    try{
        let { feed_id } = req.query;

        console.log("~~~~~~~~~~~~~~~~~~~>>>>>>",feed_id)
        let getcomment = await commentsModal.GetComment(feed_id);
        if(getcomment[0].length){
            new Response(res)._SuccessResponseWithData("Feed was fetched successfully....!",getcomment[0])
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

async deleteComment(req,res){
    try{
        let {feed_comment_id} = req.query;
        let feedlikedelete = await commentsModal.DeleteComments(feed_comment_id);
        if(feedlikedelete[0].affectedRows){
            new Response(res)._SuccessResponseWithoutData("Feed comment was Deleted Successfully....!",)
        }
        else{
            new Response(res)._ErrorMessage("Feed comment Was Not Deleted.....!")
        }
    }    
    catch(err){
         /**
             * Handling err response
             */
          new SpErrorHandler(res, err) 
    }
},

async updateComments(req,res){
    try{
        let {feed_comment_id} = req.query;

        let {user_id,feed_id,click_user_id,comment} = req.body;
            let feedData = {
            "feed_comment_id":feed_comment_id,
            "user_id":user_id,
            "feed_id":feed_id,
            "click_user_id":click_user_id,
            "comment":comment
        }
        

        let [updatecomment] = await commentsModal.Upatecomment(feedData)
        if(updatecomment.affectedRows){
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
}

}
module.exports=commentsController;
