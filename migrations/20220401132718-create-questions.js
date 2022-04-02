'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('questions',
     {qustion_id:{
       allownull:false,
       autoIncrement: true,
       primaryKey: true,
       type:Sequelize.INTEGER
     },question_summary:{
       type:Sequelize.STRING
     },
      question_image:{
        type:Sequelize.STRING
      },
      interests:{
        type:Sequelize.STRING
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{
          model: 'users',
          key:'user_id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      question_views:{
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
