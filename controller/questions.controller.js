const { StatusCodes } = require("http-status-codes")
const { message } = require("statuses");
const QuestionModel = require("../models/question.Model");
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
    console.log("get questions------------------>",interests)
    const user_id = req.user.user_id
    
    let getQuestion = await QuestionsModal.GetQuestion(user_id,interests,question_id);
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

async getAllQuestion(req,res){
    try{
    let getallquestion = await QuestionModel.getAllQuestion();
    if(getallquestion[0].length){
        new Response(res)._SuccessResponseWithData("All Question was fetched successfully....!",getallquestion[0])
    }
    else{
        new Response(res)._ErrorMessage("Questions was Fetched Failed...!")
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
async addQuestionLike(req,res){
    try{
        let { user_id,questions_id,click_user_id }= req.body
      let [checkusrlike] = await QuestionModel.checkQuestionLike(questions_id,click_user_id)
        if(checkusrlike.length){
            new Response(res)._ErrorMessage("question Like was already added.....")
        }
        else{
            let add_question_Like = await QuestionsModal.AddQuestionLike(req.body); 
            if(add_question_Like[0].affectedRows){
                new Response(res)._SuccessResponseWithoutData("question Like Added Successfully...");
            }
            else{
                new Response(res)._ErrorMessage("question Like was Not created.....")
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
async deleteQuestionLike(req,res){
    try{
        let {question_id,click_user_id} = req.query;
        
        let questionlikedelete = await QuestionModel.DeleteQuestionLike(req.query);
        if(questionlikedelete[0].affectedRows){
            new Response(res)._SuccessResponseWithoutData("Question like was Deleted Successfully....!",)
        }
        else{
            new Response(res)._ErrorMessage("Questions like Was Not Deleted.....!")
        }
    }    
    catch(err){
         /**
             * Handling err response
             */
          new SpErrorHandler(res, err) 
    }
    },
async getQuestionLike(req,res){
        try{
        let { question_id } = req.query
            let getQuestionLike = await QuestionsModal.GetQuestionLike(question_id)
            console.log(getQuestionLike[0])
            if(getQuestionLike[0].length){
                new Response(res)._SuccessResponseWithData("All Questions Likes was fetched successfully....!",getQuestionLike[0])
            }
            else{
                new Response(res)._ErrorMessage("Question Like was Fetched Failed...!")
            }
        }
        catch(err){
            new SpErrorHandler(res, err)
        }
    }

}
module.exports = qustionsController