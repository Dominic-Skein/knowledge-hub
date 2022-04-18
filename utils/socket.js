
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
    if (socket.handshake.query && socket.handshake.query.token && socket.handshake.query.mapped_user_id) {
        let user = jwt.decode(socket.handshake.query.token)
        if (user) {
            console.log("user------------>",user)
            socket.decoded = user;
            socket.mapped_user_id = socket.handshake.query.mapped_user_id;
            console.log("socket.mapped_user_id"+socket.mapped_user_id);
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
    console.log("socket io connected successfully....!")

    var getChat = async function (user_id , mapped_user_id) {

        console.log(user_id , mapped_user_id)
        // let {user_id}=user;
        // user_id + documnet_id
       let  [getChat] = await ChatModel.getMessage({
            user_id, mapped_user_id
        })
    console.log("document======>",getChat);
    // if (document.insertId) {
         io.emit('get-message', getChat);
        // }
    }

    getChat(socket.decoded.user_id , socket.document_id);

    socket.on('add-message' ,async function(data)  {
        console.log("add-message============>",data)
        data = JSON.parse(data)
        let {user_id} = socket.decoded;
        let document_id =socket.document_id;
        let{chat,mapped_user_id} =data;
        
        let [documents] = await ChatModel.addMessage({
            user_id, chat, mapped_user_id,chat_image
        })
    
        // data = {
        //     comment_id : "<comment_id_to_reply>", // optional
        //     comment : "<user_comment>"
        // }
        // document.push(data)
        ///insert 

        console.log(socket.decoded , socket.document_id)

        getDocumentComments( user_id, document_id);
    })
})


// io.on('connect', function (socket) {
//     console.log("Connected");
// var getDocumentComments = async function (user_id , document_id) {

//     console.log(user_id , document_id)
//     // let {user_id}=user;
//     // user_id + documnet_id
//    let  [document] = await UtilsModel.findComments({
//         user_id, document_id
//     })
// console.log("document======>",document);
// // if (document.insertId) {
//      io.emit('document-comments', document);
//     // }
// }

//     getDocumentComments(socket.decoded.user_id , socket.document_id);

//   socket.on('create-document-comment' ,async function(data)  {
//         console.log("create-document-comment===>>>",data)
//         data = JSON.parse(data)
//         let {user_id} = socket.decoded;
//         let document_id =socket.document_id;
//         let{parent_comment_id,comment,recipient_id,recipient,category_id_list,category_list} =data;
//         console.log("parent_comment_id =====>>>>>",recipient_id);
//         if( parent_comment_id != null){  
//            let [documents] = await UtilsModel.createcomment({
//                 user_id, document_id,parent_comment_id,comment,recipient_id,recipient,category_id_list,category_list
//             })
//         }else{ 
//         let [documents] = await UtilsModel.createcomment({
//             user_id, document_id,comment,recipient_id,recipient,category_id_list,category_list
//         })
//     }
//         // data = {
//         //     comment_id : "<comment_id_to_reply>", // optional
//         //     comment : "<user_comment>"
//         // }
//         // document.push(data)
//         ///insert 

//         console.log(socket.decoded , socket.document_id)

//         getDocumentComments( user_id, document_id);
//     })
    

// })



