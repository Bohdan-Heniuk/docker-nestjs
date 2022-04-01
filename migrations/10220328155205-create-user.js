'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    },
    {
      hooks: {
         beforeCreate: function (person, options, fn) {
             person.createdAt = new Date();
             person.updatedAt = new Date();
             fn(null, person);
         },
         beforeUpdate: function (person, options, fn) {
             person.updatedAt = new Date();
             fn(null, person);
         }
     }});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
