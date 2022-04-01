const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const CommentsModel = {
    async AddComments(data){
        console.log("model data --------------->",data)
        let query = QueryGenerator.insert('feed_comments',data) 
        return database.promise().query(query)
    },
    async Upatecomment(data){
        let query = `update feed_comments set user_id = '${data.user_id}', feed_id = '${data.feed_id}', click_user_id = '${data.click_user_id}', comment = '${data.comment}' where feed_comment_id = ${data.feed_comment_id}`
        console.log("query------------->",query)
        return database.promise().query(query)
    },
    async GetComment(data){
        let query = `select * from feed_comments where feed_id = ${data}`;
        return database.promise().query(query)
        
    },
    async DeleteComments(data){
        let query = `delete from feed_comments where feed_comment_id = ${data}`
        return database.promise().query(query)
    }
}

module.exports = CommentsModel