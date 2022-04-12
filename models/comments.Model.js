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
        let query = `select * from feed_comments c inner join users u on c.user_id = u.user_id where feed_id = ${data}`;
        return database.promise().query(query)
        
    },
    async DeleteComments(data){
        let query = `delete from feed_comments where feed_comment_id = ${data}`
        return database.promise().query(query)
    },
    async AddAnswer(data){
        let query = QueryGenerator.insert('questions_comments',data) 
        return database.promise().query(query)
    },
    async GetAnswer(questions_id,user_id){
        let query =`select  q.question_comment_id,q.user_id,q.questions_id,q.click_user_id,q.comment,q.created_at,q.updated_at,u.full_name,u.designation,u.work_experience,u.email,u.mobile_no,u.profile_picture,u.fcm_token,(SELECT click_user_id FROM questions_likes c where c.questions_id = q.questions_id AND c.click_user_id=${user_id}) as liked_user from questions_comments q inner join users u on u.user_id = q.user_id where q.questions_id = ${questions_id}`
        return database.promise().query(query)
    },
    async DeleteAnswer(data){
        let query = `delete from questions_comments where feed_comment_id = ${data}`
        return database.promise().query(query)
    },
    async AnswerUpdate(data){
        let query = `update questions_comments set user_id = '${data.user_id}', questions_id = '${data.questions_id}', click_user_id = '${data.click_user_id}', comment = '${data.comment}' where question_comment_id = ${data.question_comment_id}`
        console.log("query------------->",query)
        return database.promise().query(query)
    },
}

module.exports = CommentsModel