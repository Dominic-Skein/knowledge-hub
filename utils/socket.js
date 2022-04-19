
var jwt = require('jsonwebtoken')
const { database } = require('./database')
const ChatModel = require("../models/chat.Model");

var io = require('socket.io')(process.env.SOCKET_PORT,
    {
        cors: {
            origin: '*',
        
        },
        
    }
)

io.use(function (socket, next) {
    console.log("socket io ========================>",socket.handshake.query.token)
    if (socket.handshake.query && socket.handshake.query.token && socket.handshake.query.user_id) {
        let user = jwt.decode(socket.handshake.query.token)
        
        console.log("user------------>",user)
        if (user) {
            socket.decoded = user;
            socket.mapped_user_id = socket.handshake.query.mapped_user_id;
            console.log("connection successs")
            next();
        }
        else {
            next(new Error('Authentication error'));
        }
    }
    else {
        next(new Error('Authentication error'));
    }
})

io.on('connect', function (socket) {

    var getChat = async function (user_id , mapped_user_id) {

        console.log(user_id , mapped_user_id)
 
       let  [getChat] = await ChatModel.getMessage({
            user_id, mapped_user_id
        })
    // if (document.insertId) {
         io.emit('get-message', getChat);
        // }
    }

    getChat(socket.decoded.user_id , socket.mapped_user_id);

    socket.on('add-message' ,async function(data)  {
        console.log("add-message============>",data)
        data = JSON.parse(data)
        let {user_id} = socket.decoded;
        let{chat,chat_image,mapped_user_id} =data;
        
        if(chat_image == undefined){
            chat_image = null
        }
        
        let [documents] = await ChatModel.addMessage({
            user_id, chat, mapped_user_id,chat_image
        })
    
        // data = {
        //     comment_id : "<comment_id_to_reply>", // optional
        //     comment : "<user_comment>"
        // }
        // document.push(data)
        ///insert 


        //getDocumentComments( user_id, document_id);
    })
})


