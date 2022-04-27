const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const FeedsModel = {
    async AddFeed(data){
        let query = QueryGenerator.insert('feeds',data) 
        return database.promise().query(query)
    },
    async GetFeed({ feed_id,interests,user_id }){

        if(feed_id){
            
        let query = `select f.feed_id,f.feed_summary,f.feed_image,f.interests,f.user_id,f.created_at,f.updated_at,(SELECT click_user_id FROM feed_likes c where c.feed_id = f.feed_id AND c.click_user_id=${user_id}) as liked_user,(select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes, (select count (*) from feed_comments m where m.feed_id = f.feed_id) as feed_comments from feeds f where f.feed_id = ${feed_id}`
       
        return database.promise().query(query)
        }

        if(interests){
        
        let query = `select f.feed_id,f.feed_summary,f.feed_image,f.interests,f.user_id,f.created_at,f.updated_at,u.user_id,u.full_name,u.designation,u.work_experience,u.email,u.mobile_no,u.profile_picture,u.fcm_token ,(SELECT click_user_id FROM feed_likes c where c.feed_id = f.feed_id AND c.click_user_id=${user_id}) as liked_user,(select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes,(select count(*) from feed_comments m where m.feed_id = f.feed_id) as feed_comments from feeds f inner join users u on u.user_id = f.user_id order by f.created_at DESC`;
        //let query = `select f.feed_id,f.feed_summary,f.feed_image,f.interests,f.user_id,f.created_at,f.updated_at,(select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes, (select count (*) from feed_comments m where m.feed_id = f.feed_id) as feed_comments from feeds f where interests like "%${data.interests}%" order by created_at DESC`;

        // let query = `select * ,(select IF(user_id IS NULL, FALSE, TRUE)as liked from feed_likes c where c.click_user_id=${user_id}) (select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes,(select count(*) from feed_comments m where m.feed_id = f.feed_id) as feed_comments from feeds f inner join users u on u.user_id = f.user_id where f.interests like "%${interests}%"`
        // let query = `select f.feed_id,f.feed_summary,f.feed_image,f.interests,f.user_id,f.created_at,f.updated_at,u.user_id,u.full_name,u.designation,u.work_experience,u.email,u.mobile_no,u.profile_picture,u.fcm_token ,(SELECT click_user_id FROM feed_likes c where c.feed_id = f.feed_id AND c.click_user_id=${user_id}) as liked_user,(select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes,(select count(*) from feed_comments m where m.feed_id = f.feed_id) 
        // as feed_comments from feeds f inner join users u on u.user_id = f.user_id where f.interests like "[%${interests}%]" or f.interests like "%${interests}" order by f.created_at DESC
        // `
        console.log("query---------------------->",query)
        return database.promise().query(query)
        }
    },
    async getAllfeed(){
        let query = `select f.feed_id,f.feed_summary,f.feed_image,f.interests,f.user_id,f.created_at,f.updated_at,(select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes, (select count (*) from feed_comments m where m.feed_id = f.feed_id) as feed_comments from feeds f order by created_at DESC`;
        return database.promise().query(query);
    },
    async UpateFeed(data){
        let query = `update feeds set feed_summary = '${data.feed_summary}', feed_image = '${data.feed_image}', interests = '${data.interests}' where feed_id = ${data.feed_id}`
        return database.promise().query(query)
    },
    async DeleteFeed(data){
        let query = `delete from feeds where feed_id = ${data}`
        return database.promise().query(query)
    },
    async AddFeedLike(data){
        let query = QueryGenerator.insert('feed_likes',data) 
        return database.promise().query(query)
    },
    async DeleteFeedLike(data){
        let query = `delete from feed_likes where click_user_id = ${data.user_id} and feed_id = ${data.feed_id}`
        return database.promise().query(query)
    },
    async GetFeedLike(data){
        let query = `select * from feed_likes f inner join users u on f.user_id = u.user_id where f.feed_id = ${data}`
      console.log(query)
        return database.promise().query(query)
    }
}

module.exports = FeedsModel;