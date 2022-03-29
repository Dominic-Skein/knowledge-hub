'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('users',
     {user_id:{
       allownull: false,
       autoIncrement: true,
       primaryKey: true,
       type:Sequelize.INTEGER
     },
     full_name:{
       type:Sequelize.STRING
     },
     designation:{
       type:Sequelize.STRING
     },
     work_experience:{
       type:Sequelize.STRING
     },
     interests:{
       type:Sequelize.STRING
     },
     email:{
       type:Sequelize.STRING
     },
     mobile_no:{
       type:Sequelize.STRING
     },
     profile_picture:{
       type:Sequelize.STRING
     },
     fcm_token:{
       type:Sequelize.STRING
     },
     created_at: {
       type: Sequelize.DATE,
       allowNull: false,
       defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
     },
     updated_at: {
       type: Sequelize.DATE,
       defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
       allowNull: false
     },
     }
     )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
