module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      // Id Client
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // NAME Client
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // STREET Client
      street: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // PLACE NUMBER Client
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // COMPLEMENT Client
      complement: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // CITY Client
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // STATE Client
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      // ZIP CODE Client
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
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
    return queryInterface.dropTable('recipients');
  }
};
