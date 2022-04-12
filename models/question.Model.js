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
    async checkQuestionLike(question_id,click_user_id){
        let query = `select * from questions_likes where questions_id = ${question_id} and click_user_id = ${click_user_id}`
        return database.promise().query(query);
    },
    async GetQuestion(user_id,interests,question_id){
        
        if(question_id){
        let query = `select q.question_id,q.question_summary,q.question_summary,q.question_image,q.interests,q.user_id,q.question_views,q.created_at,q.updated_at,u.full_name,u.designation,u.work_experience,u.email,u.mobile_no,u.profile_picture,u.fcm_token , (select count (*) from questions_likes l where l.questions_id = q.question_id) as question_likes, (select count (*) from questions_comments l where l.questions_id = q.question_id) as question_comments,(SELECT click_user_id FROM questions_likes c where c.questions_id = q.question_id AND c.click_user_id=${user_id}) as liked_user from questions q inner join users u on u.user_id = q.user_id where question_id = ${question_id}`
        return database.promise().query(query)
        }

        if(interests){
        let query = `select q.question_id,q.question_summary,q.question_image,q.interests,q.user_id,q.question_views,q.created_at,q.updated_at,u.full_name,u.designation,u.work_experience,u.email,u.mobile_no,u.profile_picture,u.fcm_token ,(select count (*) from questions_likes l where l.questions_id = q.question_id) as question_likes, (select count (*) from questions_comments l where l.questions_id = q.question_id) as question_comments,(SELECT click_user_id FROM questions_likes c where c.questions_id = q.question_id AND c.click_user_id=${user_id}) as liked_user from questions q inner join users u on u.user_id = q.user_id where q.interests like "%${interests}%" order by created_at DESC`;
        return database.promise().query(query)
        }
    },
    async getAllQuestion(){
        let query = `select q.question_id,q.question_summary,q.question_summary,q.question_image,q.interests,q.user_id,q.question_views,q.created_at,q.updated_at, (select count (*) from questions_likes l where l.questions_id = q.question_id) as question_likes,(select count (*) from questions_comments l where l.questions_id = q.question_id) as question_comments from questions q order by created_at DESC`;
        return database.promise().query(query);
    },
    async DeleteQuestion(data){
        let query = `delete from questions where question_id = ${data}`
        return database.promise().query(query)
    },
    async AddQuestionLike(data){
        console.log("query data---------------------------->",data)
        let query = QueryGenerator.insert('questions_likes',data) 
        return database.promise().query(query)
    },
    async DeleteQuestionLike(data){
        let query = `delete from questions_likes where click_user_id = ${data.click_user_id} and questions_id = ${data.question_id}`
        return database.promise().query(query)
    },
    async GetQuestionLike(data){
        let query =`select * from questions_likes f inner join users u on f.user_id = u.user_id where f.questions_id = ${data}`
         console.log(query)
        return database.promise().query(query)
    }
}

module.exports = QuestionModel