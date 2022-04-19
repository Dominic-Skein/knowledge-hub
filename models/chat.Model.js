const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const ChatModel = {
async addMessage(doc) {

 let query = QueryGenerator.insert('chat',doc) 
 return database.promise().query(query)
  },

async getMessage(data){
  let query = `select * from chat where user_id in (${data.user_id},${data.mapped_user_id}) and mapped_user_id in (${data.user_id},${data.mapped_user_id}) `;
  return database.promise().query(query)
}

}
module.exports = ChatModel;