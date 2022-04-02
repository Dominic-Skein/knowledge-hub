const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const QuestionModel = {
    async AddQuestion(data){
        let query = QueryGenerator.insert('questions',data) 
        return database.promise().query(query)
    },
    async UpateQuestion(data){
        console.log("----------------------->",data)
        let query = `update questions set question_summary = '${data.question_summary}', question_image = '${data.question_image}', interests = '${data.interests}',question_views = ${data.question_views} where question_id = ${data.question_id}`
        return database.promise().query(query)
    },
    async GetQuestion(data){

        if(data.question_id){
        let query = `select * from questions where question_id = ${data.question_id}`
        return database.promise().query(query)
        }

        if(data.interests){
        let query = `select f.question_id,f.question_summary,f.question_image,f.interests,user_id,question_views, (select count(*) from questions_likes c where c.question_id = f.question_id) as question_likes from questions f where interests like "%${data.interests}%" order by created_at DESC`;
        return database.promise().query(query)
        }
    },
    async DeleteQuestion(data){
        let query = `delete from questions where question_id = ${data}`
        return database.promise().query(query)
    },
}

module.exports = QuestionModel