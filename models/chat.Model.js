const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const ChatModel = {
async addMessage(doc) {

 let query = QueryGenerator.insert('chat',doc) 
 return database.promise().query(query)
  },

//async getMessage()  

}
module.exports = ChatModel;