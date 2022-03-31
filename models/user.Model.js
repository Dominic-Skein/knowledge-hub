const QueryGenerator = require("../generators/query.generator")
const database = require("../utils/database")

const UserModel = {
    async CreateUser(userData){
        let query=QueryGenerator.insert('users',userData)
        return database.promise().query(query)
    },
    async LoginUser({mobile_no}){
        let query = `select * from users where mobile_no = ${mobile_no}`;
        return database.promise().query(query)
    },
    async GetUser(data){
        if(data.user_id){
        return query = await database.promise().query(`select * from users where user_id =${data.user_id}`);
        }

        if(data.mobile_no){
        return query = await database.promise().query(`select * from users where mobile_no =${data.mobile_no}`);    
        }
    },
    async GetAllUser(){
        return query = await database.promise().query(`select * from users order by user_id`);
    },
    async updateUser(data){
        let query = `update users set full_name = '${data.full_name}', designation = '${data.designation}' ,work_experience = '${data.work_experience}' ,interests = '${data.interests}' ,email = '${data.email}' ,mobile_no = '${data.mobile_no}' ,profile_picture = '${data.profile_picture}' ,fcm_token = '${data.fcm_token}' where user_id = ${data.user_id}`;
        console.log(query)
        return database.promise().query(query)
    },
    async deleteUser(data){
        let query = `delete from users where user_id = ${data}`;
        return database.promise().query(query);
    }
}
module.exports=UserModel;