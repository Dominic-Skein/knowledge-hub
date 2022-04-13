const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const ChatModel = {
async addMessage(doc) {
 
    // Query generator can generate a insert query based on object we passed
    return await database.connection.promise().query(QueryGenerator.insert(`chat`, doc))
  },

}
module.exports = ChatModel;