
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('banned_users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,      
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,

      },
      ban_reason: {
        type: Sequelize.STRING,
        allowNull: true
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
     }})
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable('banned_users')
  }

};
