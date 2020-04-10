module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      // Id File
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // NAME File
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // PATH File
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    return queryInterface.dropTable('files');
  }
};
