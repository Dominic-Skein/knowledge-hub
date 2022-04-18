const { StatusCodes } = require("http-status-codes")
const { message } = require("statuses")
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages");
const Response = require("../utils/response");
const moment = require('moment');
const ChatModel = require("../models/chat.Model");

const ChatController={
    async addChat(req,res){
        try{
            let {user_id, chat, mapped_user_id,chat_image} = req.body
        
            let addChat = await ChatModel.addMessage(req.body);
            if(addChat[0].affectedRows){
                new Response(res)._SuccessResponseWithoutData("Chat Create Successfully...");
            }
            else{
                new Response(res)._ErrorMessage("Chat was Not created.....")
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
module.exports=ChatController;