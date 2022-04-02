const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const QuestionModel = {
    async AddQuestion(data){
        let query = QueryGenerator.insert('questions',data) 
        return database.promise().query(query)
    },
    async UpateQuestion(data){
        let query = `update questions set question_summary = '${data.question_summary}', question_image = '${data.question_image}', interests = '${data.interests}',question_views = ${data.question_views} where question_id = ${data.question_id}`
        return database.promise().query(query)
    },
    async GetQuestion(data){

        if(data.question_id){
        let query = `select q.question_id,q.question_summary,q.question_summary,q.question_image,q.interests,q.user_id,q.question_views, (select count (*) from questions_likes l where l.questions_id = q.question_id) as question_likes, (select count (*) from questions_comments l where l.questions_id = q.question_id) as question_comments from questions q where question_id = ${data.question_id}`
        return database.promise().query(query)
        }

        if(data.interests){
        let query = `select q.question_id,q.question_summary,q.question_image,q.interests,q.user_id,q.question_views, (select count (*) from questions_likes l where l.questions_id = q.question_id) as question_likes, (select count (*) from questions_comments l where l.questions_id = q.question_id) as question_comments from questions q where interests like "%${data.interests}%" order by created_at DESC`;
        return database.promise().query(query)
        }
    },
    async getAllQuestion(){
        let query = `select q.question_id,q.question_summary,q.question_summary,q.question_image,q.interests,q.user_id,q.question_views, (select count (*) from questions_likes l where l.questions_id = q.question_id) as question_likes,(select count (*) from questions_comments l where l.questions_id = q.question_id) as question_comments from questions q order by created_at DESC`;
        return database.promise().query(query);
    },
    async DeleteQuestion(data){
        let query = `delete from questions where question_id = ${data}`
        return database.promise().query(query)
    },
    async AddQuestionLike(data){
        let query = QueryGenerator.insert('questions_likes',data) 
        return database.promise().query(query)
    },
    async DeleteQuestionLike(data){
        let query = `delete from questions_likes where questions_like_id = ${data}`
        return database.promise().query(query)
    }
}

module.exports = QuestionModel