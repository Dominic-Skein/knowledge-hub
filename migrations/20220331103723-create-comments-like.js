'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('feed_comments_likes',
     {comment_like_id:{
       allownull:false,
       autoIncrement: true,
       primaryKey: true,
       type:Sequelize.INTEGER
     },
     comment_id:{
       type:Sequelize.INTEGER
     },
     feed_id:{
       type:Sequelize.INTEGER
     },
     click_user_id:{
      type:Sequelize.INTEGER
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
   })
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
