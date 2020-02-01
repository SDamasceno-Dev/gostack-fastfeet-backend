module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('admins', {
      // Id User.
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // NAME User.
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // EMAIL User.
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      // PASSWORD_HASH Store encrypted password.
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Records the creation time
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      // Records the update time
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('admins');
  }
};
