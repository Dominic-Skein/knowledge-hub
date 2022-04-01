const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const CommentsModel = {
    async AddComments(data){
        console.log("model data --------------->",data)
        let query = QueryGenerator.insert('feed_comments',data) 
        return database.promise().query(query)
    },
    async GetComment(data){
        let query = `select * from feed_comments where feed_id = ${data}`;
        console.log("query---->",query)
        return database.promise().query(query)
        
    },
    async DeleteComments(data){
        let query = `delete from feed_comments where feed_comment_id = ${data}`
        return database.promise().query(query)
    }
}

module.exports = CommentsModel