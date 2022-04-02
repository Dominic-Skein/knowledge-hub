const { StatusCodes } = require("http-status-codes")
const { message } = require("statuses")
//const QueryGenerator = require("../generators/query.generator")
const QuestionsModal = require("../models/question.Model")
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages");
const Response = require("../utils/response");

const qustionsController={
async addQuestion(req,res){
    try{
        let {question_summary,question_image,interests,user_id,question_views} = req.body
    
        let addQus = await QuestionsModal.AddQuestion(req.body);
        if(addQus[0].affectedRows){
            new Response(res)._SuccessResponseWithoutData("Question Create Successfully...");
        }
        else{
            new Response(res)._ErrorMessage("Question was Not created.....")
        }
        }
        catch(err){
            /**
             * Handling err response
             */
             new SpErrorHandler(res, err)    
        }
},
async updateQuestion(req,res){
    try{
    let {question_id} = req.query;
    let { question_summary,question_image,interests,user_id,question_views } = req.body;
    let feedData = {
        "question_id":question_id,
        "question_summary":question_summary,
        "question_image":question_image,
        "interests":interests,
        "user_id":user_id,
        "question_views":question_views
    }
    let [updateQuestion] = await QuestionsModal.UpateQuestion(feedData);
    if(updateQuestion.affectedRows){
        new Response(res)._SuccessResponseWithoutData("Question updated Successfully...!")
    }
    else{
        new Response(res)._ErrorMessage("Question updated was Failed...!")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
},
async getQuestion(req,res){
    try{
    let { question_id,interests } = req.query;
    let getQuestion = await QuestionsModal.GetQuestion(req.query);
    if(getQuestion[0].length){
        new Response(res)._SuccessResponseWithData("Question was fetched successfully....!",getQuestion[0])
    }
    else{
        new Response(res)._ErrorMessage("Question was Fetched Failed...!")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }
},
async deleteQuestion(req,res){
    try{
    let {question_id}=req.query;
    let questiondelete = await QuestionsModal.DeleteQuestion(question_id);
    if(questiondelete[0].affectedRows){
        new Response(res)._SuccessResponseWithoutData("Question was Deleted Successfully....!",)
    }
    else{
        new Response(res)._ErrorMessage("Question Was Not Deleted.....!")
    }
    }
    catch(err){
        /**
         * Handling err response
         */
         new SpErrorHandler(res, err)    
    }

},

}
module.exports = qustionsController