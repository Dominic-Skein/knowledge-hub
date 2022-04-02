const QueryGenerator = require("../generators/query.generator")
const  database = require("../utils/database")

const FeedsModel = {
    async AddFeed(data){
        let query = QueryGenerator.insert('feeds',data) 
        return database.promise().query(query)
    },
    async GetFeed(data){

        if(data.feed_id){
        let query = `select f.feed_id,f.feed_summary,f.feed_image,f.interests,f.user_id,(select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes, (select count (*) from feed_comments m where m.feed_id = f.feed_id) as feed_comments from feeds f where f.feed_id = ${data.feed_id}`
        return database.promise().query(query)
        }

        if(data.interests){
        let query = `select f.feed_id,f.feed_summary,f.feed_image,f.interests,f.user_id, (select count(*) from feed_likes c where c.feed_id = f.feed_id) as feed_likes, (select count (*) from feed_comments m where m.feed_id = f.feed_id) as feed_comments from feeds f where interests like "%${data.interests}%" order by created_at DESC`;
        return database.promise().query(query)
        }
    },
    async getAllfeed(){
        let query = `select * from feeds order by created_at DESC`;
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
        let query = `delete from feed_likes where feed_like_id = ${data}`
        return database.promise().query(query)
    }
}

module.exports = FeedsModel;