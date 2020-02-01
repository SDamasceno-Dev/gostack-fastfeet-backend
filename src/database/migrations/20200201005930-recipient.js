module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipient', {
      // Id Client.
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // NAME Client.
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // STREET Client.
      rua: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // PLACE NUMBER Client.
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // COMPLEMENT Client.
      complemento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // CITY Client.
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // STATE Client.
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // ZIP CODE Client.
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
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
    return queryInterface.dropTable('recipient');
  }
};
